const badWords = [
    "fuck", "f-word", "fuk", "fuker", "fucker",
    "shit", "sh*t", "sh1t", "shitter",
    "ass", "azz", "as*", "a$$", "asshole",
    "bitch", "b!tch", "b!tchez", "bitch3",
    "dick", "d!ck", "dik", "d1ck",
    "pussy", "p***y", "pu$$y", "pussycat",
    "cunt", "c*nt", "cuntz",
    "motherfucker", "motherf***er", "mutha****a", "mothafuka",
    "bastard", "b@stard", "b@st4rd",
    "whore", "wh0re", "wore", "h0r3",
    "slut", "sl*t", "slutty", "s1ut",
    "cock", "c0ck", "cok", "c***",
    "twat", "tw@t", "twatty",
    "douche", "douchebag", "douchefag",
    "bimbo", "b!mb0", "bimb0",
    "retard", "r3tard", "r*tard",
    "nigger", "n*gger", "n1gger", "n!gger",
    "sucks", "stinks", "poop", "hora", "knulla", "knula",
    "våldta", "rape", "kill", "k!ll", "k1ll", "death", "dead", "die",
    "i'll kill you", "i'll f***ing kill you", "i'm going to kill you",
    "hurt", "h1rt", "i'll hurt you", "hurting",
];

export function checkBadWords(message) {
    console.log(message);
    for (let i = 0; i < badWords.length; i++) {
        if (message.toLowerCase().includes(badWords[i])) {
            console.log("Bad word found: ", badWords[i])
            return "This language is not OK! Try again."
        }
    }
    return null;
}