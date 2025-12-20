# Branding assets: estructura y reglas

## Slugs
- Formato: kebab-case, ASCII, sin acentos ni espacios. Ej.: `wave-cafe`, `glow-fit-studio`.

## Nombres de archivos
- Minúsculas, kebab-case, sin acentos ni espacios. Ej.: `thumbnail.svg`, `mockup-1.svg`.

## Estructura requerida
```
public/
  projects/
    branding/
      <slug>/
        hero/
          thumbnail.svg
        brand/
          logo.svg
          moodboard.svg
        social/
          instagram.svg
        merch/
          mockup-1.svg
          mockup-2.svg
        ui/
          ui-1.svg
```

## Cómo agregar un nuevo kit
1) Elegí un slug en kebab-case (ASCII) y creá la carpeta: `public/projects/branding/<slug>/`.
2) Creá las subcarpetas: `hero/`, `brand/`, `social/`, `merch/`, `ui/`.
3) Agregá los archivos requeridos (SVG o finales) con los nombres indicados arriba.
4) Añadí la entrada de datos en `src/data/branding.ts` apuntando a estas rutas.
5) Ejecutá `npm run check:assets` para validar que las rutas existan.



