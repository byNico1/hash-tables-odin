function HashNode(key, value) {
  return {
    key,
    value,
  };
}

function HashMap(size = 5) {
  return {
    table: new Array(size),
    hash(key, tableSize) {
      let hashCode = 0;

      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
      }

      return hashCode % tableSize;
    },

    set(key, value) {
      const index = this.hash(key, size);
      const node = HashNode(key, value);

      if (this.table[index] === undefined) {
        this.table[index] = [node];
      } else {
        let inserted = false;
        for (let i = 0; i < this.table[index].length; i++) {
          if (this.table[index][i].key === key) {
            this.table[index][i].value = value;
            inserted = true;
            break;
          }
        }

        if (!inserted) {
          this.table[index].push(node);
        }
      }
    },

    get(key) {
      const index = this.hash(key, size);

      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i].key === key) {
          return this.table[index][i].value;
        }
      }

      return null;
    },

    has(key) {
      const index = this.hash(key, size);

      if (!this.table[index] || this.table[index].length === 0) {
        return false;
      } else {
        for (let i = 0; i < this.table[index].length; i++) {
          if (this.table[index][i].key === key) {
            return true;
          }
        }
      }
    },

    remove(key) {
      const index = this.hash(key, size);

      if (!this.table[index]) {
        return false;
      }

      if (this.table[index].length === 1 && this.table[index][0][0] === key) {
        delete this.table[index];
      } else {
        for (let i = 0; i < this.table[index].length; i++) {
          if (this.table[index][i].key === key) {
            this.table[index].splice(i, 1);
          }
        }
      }
    },

    length() {
      let length = 0;
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] !== undefined) {
          length += this.table[i].length;
        }
      }

      return length;
    },
    clear() {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] !== undefined) {
          delete this.table[i];
        }
      }
    },

    keys() {
      let keys = [];

      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] !== undefined && this.table[i].length === 1) {
          keys.push(this.table[i][0].key);
        } else if (this.table[i] !== undefined && this.table[i].length > 1) {
          for (let j = 0; j < this.table[i].length; j++) {
            console.log(this.table[i][j]);
            keys.push(this.table[i][j].key);
          }
        }
      }

      return keys;
    },
    values() {
      let values = [];

      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] !== undefined && this.table[i].length === 1) {
          values.push(this.table[i][0].value);
        } else if (this.table[i] !== undefined && this.table[i].length > 1) {
          for (let j = 0; j < this.table[i].length; j++) {
            console.log(this.table[i][j]);
            values.push(this.table[i][j].value);
          }
        }
      }

      return values;
    },
    entries() {
      let entries = [];
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[i] !== undefined) {
          if (this.table[i].length === 1) {
            entries.push([this.table[i][0].key, this.table[i][0].value]);
          } else {
            for (let j = 0; j < this.table[i].length; j++) {
              entries.push([this.table[i][j].key, this.table[i][j].value]);
            }
          }
        }
      }

      return entries;
    },
  };
}

const hash = HashMap(10);
hash.clear();
hash.set("Carlos", "This is Carlos");
hash.set("Carla", "This is Carla");
console.log(hash.get("Carlos"));
console.log(hash.get("Carla"));
console.log(hash.has("Carla"));
console.log(hash.table);
hash.remove("Carla");
console.log(hash.has("Carlosa"));
console.log(hash.length() + " before clear length");
hash.clear();
console.log(hash.length() + " after clear length");
hash.set("Nicolas", "This is Nicolas");
hash.set("Someone", "This is Someone");
hash.set("Alguien", "This is Alguien");
hash.remove("Alguien");
console.log(hash.keys());
console.log(hash.values());
console.log(hash.entries());
console.log(hash.table);
