// netlify/functions/asesor-financiero.mjs
// Proxy seguro para la IA del Asesor Financiero (Netlify Function v2)
// Las credenciales de AI Gateway se inyectan automáticamente en runtime.

import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `Eres un asesor financiero experto y empático especializado en educación financiera para colombianos. Tu objetivo es:

1. Explicar conceptos financieros complejos de forma clara y accesible
2. Usar ejemplos colombianos (pesos, salarios, contexto local)
3. Ayudar a profundizar en conceptos de: valor del dinero en el tiempo, inflación, poder adquisitivo, ahorro, inversión, deuda
4. Ser conciso pero completo (máximo 150 palabras por respuesta)
5. Usar un tono amable, motivador y educativo

Contexto de la app: El usuario está aprendiendo sobre cómo la inflación reduce su poder de compra. Ayúdale a entender las implicaciones y estrategias para proteger su dinero.

Responde SIEMPRE en español, con ejemplos prácticos y números concretos cuando sea relevante.`;

export default async (req) => {
  // Solo POST
  if (req.method !== "POST") {
    return Response.json(
      { error: "Método no permitido" },
      { status: 405 },
    );
  }

  try {
    const { pregunta, contexto } = await req.json();

    if (!pregunta) {
      return Response.json({ error: "Pregunta vacía" }, { status: 400 });
    }

    // Construir mensaje con contexto de la calculadora
    const mensajeUsuario = `
El usuario está trabajando con estos parámetros en la calculadora:
- Monto: $${contexto.monto} COP
- Años: ${contexto.años}
- Inflación anual: ${contexto.inflacion}%

Pregunta: ${pregunta}

Por favor ayuda a profundizar en este concepto financiero.
    `.trim();

    const message = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: mensajeUsuario,
        },
      ],
    });

    const respuesta =
      message.content[0].type === "text"
        ? message.content[0].text
        : "No se pudo generar la respuesta.";

    return Response.json(
      { respuesta },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Error en Asesor IA:", error);
    return Response.json(
      {
        error: "Error del servidor",
        detalle: error.message,
      },
      { status: 500 },
    );
  }
};
