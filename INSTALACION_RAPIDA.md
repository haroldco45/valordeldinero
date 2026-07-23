# 🚀 Instalación Rápida — Educación Financiera + Asesor IA

**Harold**, aquí está tu app con el Asesor IA integrado. Sin nada roto, todo agregado. 

---

## ⏱️ 5 Minutos para Ponerlo en Vivo

### Paso 1️⃣: Crea Cuenta Netlify (1 min)
👉 https://netlify.com → Sign up → Usa tu email

### Paso 2️⃣: Prepara tu API Key
1. Ve a https://console.anthropic.com/api/keys
2. Copia tu clave (empieza con `sk-ant-`)
3. Guárdala temporalmente en un bloc de notas

### Paso 3️⃣: Deploy en Netlify
```bash
# En terminal/PowerShell:
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

Cuando Netlify te pida configurar, elige esta carpeta (`/home/claude/`).

### Paso 4️⃣: Configura la Variable de Entorno
1. Ve a tu dashboard de Netlify → Settings → Build & Deploy
2. Busca **Environment**
3. Agrega:
   - **Key:** `ANTHROPIC_API_KEY`
   - **Value:** Pega tu clave API (sk-ant-...)

### Paso 5️⃣: Redeploy
```bash
netlify deploy --prod
```

**¡Listo! Tu app está viva con Asesor IA.** 🎉

---

## 🤖 Lo Nuevo: Asesor Financiero IA

### Qué se Agregó:
- ✅ Nueva sección **"Asesor Financiero IA"** (abajo en la app)
- ✅ Chat interactivo donde el usuario pregunta
- ✅ IA responde sobre inflación, inversión, ahorro
- ✅ Contexto de la calculadora incluida automáticamente

### Cómo Usa el Usuario:
1. Escribe pregunta: *"¿Cómo proteger mi dinero de la inflación?"*
2. IA responde con ejemplo colombiano y consejos

### Backend:
- 🔒 API key **protegida en servidor** (Netlify Function)
- 🚀 Usa **Claude Haiku** (rápido y económico)
- 📊 Funciona como **El Consejero del Cierre Diario**

---

## 📂 Archivos Incluidos

```
educacion-financiera/
├── index.html                    ← App principal (actualizada)
├── README.md                     ← Documentación completa
├── INSTALACION_RAPIDA.md         ← Este archivo
├── package.json                  ← Dependencias Node
├── netlify.toml                  ← Configuración Netlify
└── netlify/functions/
    └── asesor-financiero.js      ← Proxy seguro de IA
```

---

## 🔄 Patrón de Arquitectura

```
Navegador (HTML/JS)
       ↓
  Envía pregunta
       ↓
Netlify Function (segura)
       ↓
  Verifica API key
       ↓
  Llama a Claude IA
       ↓
  Respuesta → Navegador
```

**Ventaja:** La API key **nunca viaja en el browser** ✅

---

## 🎯 Personalización

### Cambiar el "Tono" del Asesor
Edita `netlify/functions/asesor-financiero.js`, línea 10:

```javascript
const SYSTEM_PROMPT = `
Eres un asesor financiero... [TU NUEVO TONO AQUÍ]
`;
```

### Cambiar Modelo de IA
Línea 60 del mismo archivo:

```javascript
model: "claude-opus-4-1-20250805", // Más potente pero más caro
```

---

## 🐛 Troubleshooting

**P: "No funciona el chat de IA"**
- Revisa: ¿Está configurada la variable `ANTHROPIC_API_KEY` en Netlify?
- Consola (F12 → Network): ¿Ve error 500?
- Solución: Redeploy (`netlify deploy --prod`)

**P: "Muy lento el Asesor"**
- Normal en Netlify (cold start ~1-2s)
- Si persiste: Cambia a `claude-sonnet-4-6` (más rápido)

**P: "Billing muy alto"**
- Netlify Functions + Claude Haiku = muy económico
- Si aún preocupa: Agrega `max_tokens: 150` en asesor-financiero.js

---

## 📞 Support Quick

**¿Dudas sobre Netlify?**
→ https://docs.netlify.com/functions/overview/

**¿Dudas sobre Claude API?**
→ https://docs.anthropic.com

**¿Config Tailscale + Netlify?**
→ Usa este mismo patrón en tus portales 192.168.1.12:3001

---

## ✨ Lo Que NO Se Tocó

- ✅ Calculadora (igual)
- ✅ Infografía (igual)
- ✅ Explicaciones (igual)
- ✅ Guía QUÉ HACER (igual)
- ✅ Footer con crédito VIBRAS POSITIVAS HM (actualizado)

---

**Versión:** 2.0 — Julio 2026  
**Creador:** Vibras Positivas HM  
**Patrón de Seguridad:** Netlify Functions (probado en Cierre Diario ✅)

¡A darle! 🚀
