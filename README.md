# Educación Financiera + Asesor IA
**Vibras Positivas HM**

Una PWA educativa interactiva sobre el Valor del Dinero en el Tiempo con **Asesor Financiero IA integrado**.

---

## 📋 Contenido

✅ **Calculadora interactiva** de poder adquisitivo y inflación  
✅ **Infografía explicativa** personalizable  
✅ **Explicación teórica** detallada (VDT, inflación, riesgo)  
✅ **Guía práctica** (qué hacer / qué NO hacer)  
✅ **🤖 Asesor IA** (NUEVO) — Chat en vivo con un experto financiero que responde preguntas personalizadas

---

## 🚀 Despliegue en Netlify

### Opción 1: Deploy Rápido (Recomendado)

1. **Crea una cuenta en [Netlify](https://netlify.com)** (gratis)

2. **Descarga este repositorio:**
   ```bash
   git clone [tu-repo-url]
   cd educacion-financiera
   ```

3. **Instala dependencias de Netlify Functions:**
   ```bash
   npm install @anthropic-ai/sdk
   ```

4. **Conecta tu API key de Anthropic:**
   - Ve a https://dashboard.netlify.com → Settings → Build & Deploy → Environment
   - Agrega variable de entorno: `ANTHROPIC_API_KEY` = tu API key

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

### Opción 2: Deploy desde GitHub + Netlify

1. **Sube el proyecto a GitHub**
2. **Conecta en Netlify:** Netlify → New site from Git → Selecciona el repo
3. **Configura la variable de entorno** `ANTHROPIC_API_KEY` en Netlify Dashboard
4. **Netlify despliega automáticamente** en cada push

---

## 🔑 Variables de Entorno Necesarias

En Netlify Dashboard → Settings → Build & Deploy → Environment:

```
ANTHROPIC_API_KEY = sk-ant-v0-xxxxx...
```

**⚠️ NUNCA** commits tu API key al repositorio. Siempre usa variables de entorno.

---

## 📁 Estructura del Proyecto

```
.
├── index.html                          # App principal (PWA)
├── netlify/
│   └── functions/
│       └── asesor-financiero.js        # Proxy de IA (Netlify Function)
├── package.json                        # Dependencias
└── README.md                           # Este archivo
```

---

## 💡 Cómo Funciona el Asesor IA

1. **Usuario escribe una pregunta** en el chat
2. **JavaScript del navegador** envía la pregunta a `/.netlify/functions/asesor-financiero`
3. **Netlify Function** (servidor) recibe la pregunta
4. **API key segura** (en variable de entorno) llama a Claude Haiku
5. **Respuesta generada** vuelve al navegador y se muestra en el chat

**Ventajas del patrón Netlify Functions:**
- ✅ API key **nunca viaja en el navegador**
- ✅ **Rate limiting** en el servidor
- ✅ **Costo optimizado** (Haiku es más económico)
- ✅ **CORS y seguridad** manejados automáticamente

---

## 🎨 Personalización

### Cambiar el contexto del Asesor IA

Edita el `SYSTEM_PROMPT` en `netlify/functions/asesor-financiero.js`:

```javascript
const SYSTEM_PROMPT = `Tu nuevo contexto aquí...`;
```

### Cambiar el modelo de IA

En `asesor-financiero.js`, línea del `client.messages.create()`:

```javascript
model: "claude-opus-4-1-20250805", // Cambiar modelo
```

Modelos disponibles:
- `claude-haiku-4.5-20250307` (rápido, económico) ← Recomendado
- `claude-sonnet-4-6` (más potente)
- `claude-opus-4-1-20250805` (máxima calidad)

---

## 📱 Características PWA

- **Instalable** en Android/iPhone (botón "Instalar App")
- **Funciona offline** (Service Worker incrustado)
- **Responsive** y optimizado para móvil
- **Tema oscuro** profesional

---

## 🛡️ Seguridad

✅ API key protegida en servidor (nunca en cliente)  
✅ Validación de entrada en la Netlify Function  
✅ CORS configurado automáticamente  
✅ Rate limiting recomendado (ver Netlify docs)

---

## 📞 Soporte

Para modificaciones o preguntas:
- **Email:** [tu-email]
- **WhatsApp:** [tu-número]
- **Documentación Netlify Functions:** https://docs.netlify.com/functions/overview/

---

## 📄 Licencia

Desarrollada por **Vibras Positivas HM** — Derechos de Autor Reservados

---

## Versión

**v2.0** — Educación Financiera + Asesor IA  
Actualizado: Julio 2026
