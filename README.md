# Jags Technology — Web de presencia

Sitio HTML5 + CSS3 + JavaScript para el proyecto final de **Desarrollo Web · CESDE** (Profe Luis Fernando Henao).  
Cliente: **Jags Technology / JAGSTECHNOLOGY**. Equipo: Erika Vázquez, Javier Gómez, Juan Camilo, Xiomara Muñoz y Maryluz Cardona.

Página única (`index.html`) de presencia accionable: informar, mostrar trabajos y generar solicitudes por WhatsApp.

## Cómo abrir

**Opción A — archivo local**

Abre `/workspace/jags-web/index.html` en el navegador (`file://`).

**Opción B — servidor estático**

```bash
cd /workspace/jags-web
python3 -m http.server 8080
```

Luego visita <http://localhost:8080>.

## Estructura

```
jags-web/
├── index.html
├── README.md
└── assets/
    ├── css/styles.css
    ├── js/main.js          # menú, lightbox, formulario → WhatsApp
    └── img/
        ├── logo-escudo.png          # logo aprobado (escudo)
        ├── logo-jags-escudo.png
        └── galeria/01–07 *.jpg      # fotos reales de trabajos
```

## Secciones

1. Inicio / hero  
2. Nosotros  
3. Servicios (8 líneas; CCTV destacado)  
4. Por qué elegirnos  
5. Planes y garantías  
6. Galería  
7. FAQ  
8. Contacto y solicitud  

CTA principal: **Solicitar servicio** → formulario que abre `https://wa.me/573217823068?text=...` con el prefijo «Hola, vi la web de Jags y quiero cotizar…».

## Identidad (brief)

- Logo: escudo (no hexágono con «J»)
- Paleta: `#020613` / `#1957A1` / `#3190DD` + acento `#f97316`
- Tipografía: Outfit (titulares) + Inter (cuerpo), con fallback Helvetica / Arial
- Sin mapa (modelo a domicilio, Medellín)
- Entrega del sitio: 13/11/2026

## Alcance

Web de **presencia** (informar + contactar). No incluye la plataforma operativa del proyecto integrado (solicitud → cotización → órdenes → garantías).

Brief: `/workspace/cesde-brief/Brief_CESDE_JagsTechnology.md`

## Pulido visual (noviembre 2026)

Pase premium / agency: tema oscuro de seguridad, escala tipográfica con `clamp`, hero con malla y foto real de galería, cards con índice y hover, CTA naranja con profundidad, y microinteracciones (header sticky con blur, FAQ, lightbox y FAB de WhatsApp). El contenido y las restricciones del brief no cambian.
