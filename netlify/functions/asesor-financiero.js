// netlify/functions/asesor-financiero.js
// Proxy seguro para la IA del Asesor Financiero
// Mantiene la API key del lado del servidor (variable de entorno)

const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `Eres un asesor financiero experto y empático especializado en educación financiera para colombianos. Tu objetivo es:

1. Explicar conceptos financieros complejos de forma clara y accesible
2. Usar ejemplos colombianos (pesos, salarios, contexto local)
3. Ayudar a profundizar en conceptos de: valor del dinero en el tiempo, inflación, poder adquisitivo, ahorro, inversión, deuda
4. Ser conciso pero completo (máximo 150 palabras por respuesta)
5. Usar un tono amable, motivador y educativo

Contexto de la app: El usuario está aprendiendo sobre cómo la inflación reduce su poder de compra. Ayúdale a entender las implicaciones y estrategias para proteger su dinero.

Responde SIEMPRE en español, con ejemplos prácticos y números concretos cuando sea relevante.`;

exports.handler = async (event) => {
  // Solo POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  }

  try {
    const { pregunta, contexto } = JSON.parse(event.body);

    if (!pregunta) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Pregunta vacía" }),
      };
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
      model: "claude-haiku-4.5-20250307",
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

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ respuesta }),
    };
  } catch (error) {
    console.error("Error en Asesor IA:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error del servidor",
        detalle: error.message,
      }),
    };
  }
};
