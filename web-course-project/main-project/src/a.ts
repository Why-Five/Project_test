class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  say = (who: string | number) => {
    // God：上帝 / god：神
    const whoStr = who.toString();
    const firstChar = whoStr.charAt(0).toLocaleUpperCase();
    console.log(`${firstChar}${whoStr.slice(1)} bless you`);
  };
}

type God = 'God' | 'god' | 'Trisolarn' | '主'
let DPZ = new Person("DPZ");
// let 主: string | number = 6; // 6 | 'god' | 'Trisolaran' (三体人)
let 主: God = 'God';
DPZ.say(主);