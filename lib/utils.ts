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

export function removeShorthand(shorthand: string) {
  // @ts-ignore
  let allShorthands: Array<{ shorthand: string; content: string }> = JSON.parse(
    localStorage.getItem('shorthands'),
  );

  let updatedShorthandList = allShorthands.filter(function (item) {
    if (item?.shorthand !== shorthand) return item;
  });

  localStorage.setItem('shorthands', JSON.stringify(updatedShorthandList));
}

export function updateShorthandData({
  shorthand,
  newShorthand,
  newContent,
}: {
  shorthand: string;
  newShorthand: string;
  newContent: string;
}) {
  // @ts-ignore
  let allShorthands: Array<{ shorthand: string; content: string }> = JSON.parse(
    localStorage.getItem('shorthands'),
  );

  let updatedShorthandList = allShorthands.map((item) => {
    if (item?.shorthand === shorthand) {
      item = {
        shorthand: newShorthand,
        content: newContent,
      };
    }
    return allShorthands;
  });

  localStorage.setItem('shorthands', JSON.stringify(updatedShorthandList));
}

export function setCharAt(str: string, index: number, chr: string) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}
