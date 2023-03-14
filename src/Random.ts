//get random elements from an array
export function getRandomElements(arr: Array<any>, n: number) {
    // Create a copy of the input array to avoid modifying the original array
    const copyArr = Array.from(arr);
    
    // Shuffle the array (random returns 0=> num <1)
    copyArr.sort(function(){return .5 - Math.random()});
    // Return the first n elements of the shuffled array
    return copyArr.slice(0, n);
  }

export function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

export let starNames = [
  'Zorin', 
  'Aurin', 
  'Lyndra', 
  'Niraya', 
  'Vaxar', 
  'Xandria', 
  'Zephyrion', 
  'Nivara', 
  'Elvandar', 
  'Galaxor', 
  'Nebulia', 
  'Stellara', 
  'Solairis', 
  'Astronia', 
  'Lunaris', 
  'Ecliptix', 
  'Novastra', 
  'Celestia', 
  'Astroxia', 
  'Orbiton'
];

export let planetNames = [
  'Aurion', 
  'Caldera', 
  'Elysium', 
  'Feronia', 
  'Gaia', 
  'Helion', 
  'Ignatia', 
  'Jovar', 
  'Korinthea', 
  'Luminar', 
  'Mystia', 
  'Nebulon', 
  'Olympus', 
  'Pandora', 
  'Quintar', 
  'Ravenna', 
  'Sylvan', 
  'Talaxia', 
  'Umbriel', 
  'Vesperia'
];

export let moonNames = [
  'Aurora', 
  'Bellona', 
  'Calyx', 
  'Daphne', 
  'Elara', 
  'Feron', 
  'Gwyneth', 
  'Halia', 
  'Idalia', 
  'Jordana', 
  'Kael', 
  'Liriope', 
  'Morgath', 
  'Naida', 
  'Ophelia', 
  'Prysm', 
  'Quinna', 
  'Rhea', 
  'Selene', 
  'Thalia'
];