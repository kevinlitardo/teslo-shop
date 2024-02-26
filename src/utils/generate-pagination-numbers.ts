export const generate_pagination_numbers = (
  current_page: number,
  total_pages: number
) => {
  // Si el número total de pags en 4 o menos vamos a mostrar todas las pags
  if (total_pages <= 5) {
    return Array.from({ length: total_pages }, (_, i) => i + 1);
  }

  // Si la pag actual está entre las primeras 3
  // mostrar las 3 primeras, elipsis y las 2 últimas
  if (current_page <= 3) {
    return [1, 2, 3, '...', total_pages];
  }

  // Si la pag actual está entre las últimas
  // mostrar primeras 2 y últimas 3
  if (current_page >= total_pages - 2) {
    return [1, '...', total_pages - 2, total_pages - 1, total_pages];
  }

  // Si la página actual está en otra posición
  // mostramos la primera pag, elipsis, la actual y adyacentes, elipsis, y la última
  return [
    1,
    '...',
    current_page - 1,
    current_page,
    current_page + 1,
    '...',
    total_pages
  ];
};
