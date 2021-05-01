function (input) {
    var dictionary = [],
        enlargeIn = 1,
        dictSize = 3,
        numBits = 1,
        entry,
        result = [],
        lastEntry,
        bits, bitPos,
        currentChar,
        value,
        pos = 0,
        idx = 0;

    var readBits = function(pow) {
      bits = 0;
      bitPos = 0;
      while (bitPos < pow) {
        if (pos < 2) {
          pos = 64;
          value = (value = input.charCodeAt(idx++), value > 92 ? value - 59 : value - 58);
          // : = 58
          // \ = 92
        }

        pos /= 2;
        bits |= ((value & pos) > 0 ? 1 : 0) << bitPos;
        ++bitPos;
      }
    };

    while (true) { // idx > input.length => return ""
      readBits(numBits+1);

      if (bits == 2) {
        return result.join('');
      }

      // check if bits is 0 or 1
      if (!((currentChar = bits) & ~1)) {
        readBits(bits*8+8);
        dictionary[currentChar = dictSize++] = String.fromCharCode(bits);

        if (!--enlargeIn) {
          enlargeIn = 2 << numBits++;
        }
      }

      result.push(entry = dictionary[currentChar] || lastEntry + lastEntry[0]);

      if (lastEntry) {
        dictionary[dictSize++] = lastEntry + entry[0];

        if (!--enlargeIn) {
          enlargeIn = 2 << numBits++;
        }
      }

      lastEntry = entry;
    }
  }