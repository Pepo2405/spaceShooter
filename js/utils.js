export function reduceOpacity(hexColor) {
  // Extraer los componentes RGB del color hexadecimal
  const red = parseInt(hexColor.substring(1, 3), 16);
  const green = parseInt(hexColor.substring(3, 5), 16);
  const blue = parseInt(hexColor.substring(5, 7), 16);

  // Calcular la nueva opacidad
  let opacity = 1;
  if (hexColor.length === 9) {
    opacity = parseInt(hexColor.substring(7, 9), 16) / 255;
  }

  // Reducir la opacidad en 1%
  opacity -= 0.01;

  // Limitar la opacidad a un rango entre 0 y 1
  opacity = Math.max(0, Math.min(opacity, 1));

  // Convertir los componentes RGB y la nueva opacidad a formato hexadecimal
  const newOpacity = Math.round(opacity * 255).toString(16).padStart(2, '0');
  const newHexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}${newOpacity}`;

  // Devolver el nuevo color hexadecimal con opacidad reducida
  return newHexColor;
}
