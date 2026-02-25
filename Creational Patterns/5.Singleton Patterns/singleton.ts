
// For notes use notes.md file so u can understand batter .

class Singleton {
  private static instance: Singleton;

  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance
  }

}

const s1 = Singleton.getInstance();
const s2 = Singleton.getInstance();

console.log(s1 === s2); 