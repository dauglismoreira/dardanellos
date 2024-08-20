export default function onlyNumbers(inputString: string): string {
    const regex = /[0-9]/g;
    const matches = inputString.match(regex);
    return matches ? matches.join('') : '';
  }