import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function saveToLocalStorage({
  newShorthand,
  newContent,
}: {
  newShorthand: string;
  newContent: string;
}) {
  let allShorthands: Array<{ shorthand: string; content: string }> = [];
  if (localStorage.getItem('shorthands') === null) {
    allShorthands = [];
  } else {
    // @ts-ignore
    allShorthands = JSON.parse(localStorage.getItem('shorthands'));
  }

  allShorthands.push({ shorthand: newShorthand, content: newContent });
  localStorage.setItem('shorthands', JSON.stringify(allShorthands));
}

export function getShorthands() {
  if (typeof window !== 'undefined') {
    // @ts-ignore
    return JSON.parse(localStorage.getItem('shorthands'));
  }
}

export function getShorthandContent(shorthand: string) {
  let shorthandResponse;
  // @ts-ignore
  JSON.parse(localStorage.getItem('shorthands'))?.map((shorthandItem) => {
    if (shorthandItem?.shorthand === shorthand) {
      shorthandResponse = shorthandItem?.content;
    }
  });
  return shorthandResponse;
}


