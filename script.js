// मुख्य इतिहास की सीक्वेंस (बहुत लंबी हिस्ट्री)
let history = "110100011101001101001101011100110101100101001101010010101010010100101111101110010101111000101111101110010101111000000000110100000101001010111010101000101110011110110010101000011111101110111010010110000100010101011111000000010110110000010110110000011111000000111010010110000100010101011111101110100001011101010010100010000100010101000100100010010001000010110001100011000011001010011000010000110011111001111111110111110111110001110001100001101000110110110010000010000001111010111010101111111100111100111000101110010111110010000001110111111111001011101001011100101001011100101110011111110110010100101001111101001100111001100111011001110110011101111110111101111100010111100100101001010010010100011100010001011100100110001011010010111100011001001100111010010110011001011001000001010001010010100010100010101001000100100001100010000110011100010111010001010111110111110001101101000000111010111111110010111001011111110101110011110110010100110011101111001001";

// उपयोगकर्ता के इनपुट की वैधता जांचना (केवल 0 और 1 की अनुमति)
function validateInput() {
    let input = document.getElementById("sequenceInput");
    let value = input.value;

    // केवल '0' और '1' की अनुमति, बाकी कैरेक्टर हटा दें
    input.value = value.replace(/[^01]/g, '');
}

// इनपुट बॉक्स में 0 या 1 जोड़ना (बटन दबाने पर)
function addToSequence(value) {
    let input = document.getElementById("sequenceInput");
    input.value += value;
}

// जब उपयोगकर्ता 'Check' बटन दबाएगा, तो इतिहास का विश्लेषण करके भविष्यवाणी की जाएगी
function checkPrediction() {
    let input = document.getElementById("sequenceInput").value;

    // सुनिश्चित करें कि इनपुट खाली नहीं है
    if (input.length === 0) {
        alert("Please enter at least one digit (0 or 1)");
        return;
    }

    // इतिहास का विश्लेषण करके अगले परिणाम की भविष्यवाणी करें
    let prediction = predictNext(input);

    // भविष्यवाणी को प्रदर्शित करें
    document.getElementById("prediction").textContent = prediction;
}

// इतिहास का विश्लेषण करके अगला परिणाम भविष्यवाणी करना
function predictNext(currentSequence) {
    let matches = [];
    let len = currentSequence.length;

    // इतिहास में सभी मिलान ढूंढें
    for (let i = 0; i <= history.length - len; i++) {
        if (history.substring(i, i + len) === currentSequence) {
            matches.push(history.charAt(i + len)); // सीक्वेंस के बाद का अगला अंक जोड़ें
        }
    }

    // अगर कोई मैच नहीं मिलता
    if (matches.length === 0) {
        return "Not enough data";
    }

    // अब 0 और 1 की संख्या गिनें
    let count0 = matches.filter(char => char === '0').length;
    let count1 = matches.filter(char => char === '1').length;

    // जिसकी संख्या ज्यादा हो उसे सुझाएं
    if (count1 > count0) {
        return "Big";
    } else if (count0 > count1) {
        return "Small";
    } else {
        return "The number of 0 and 1 is equal";
    }
}