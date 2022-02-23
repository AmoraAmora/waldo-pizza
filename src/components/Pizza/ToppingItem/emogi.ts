export const getEmogi = (name: string) => {
  switch (name) {
    case 'onion': return '🧅'
    case 'green olives': return '🍈'
    case 'bell peps': return '🍅'
    case 'cheese': return '🧀'
    case 'sausage': return '🥓'
    case 'pepperoni': return '🍕'
    case 'banana peps': return '🌶️'
    default: return null
  }
}
