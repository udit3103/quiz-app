const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3003;

// Sample historical questions
const questions = [
    { question: "When did the American Revolutionary War begin?", answer: "1775" },
    { question: "When did the Declaration of Independence get signed?", answer: "1776" },
    { question: "When did World War I start?", answer: "1914" },
    { question: "When did World War II end?", answer: "1945" },
    { question: "When did the Berlin Wall fall?", answer: "1989" },
    { question: "When did the Roman Empire fall?", answer: "476" },
    { question: "When was the Magna Carta signed?", answer: "1215" },
    { question: "When did the Black Death occur?", answer: "1347" },
    { question: "When did the Renaissance begin?", answer: "1300" },
    { question: "When did the Ottoman Empire capture Constantinople?", answer: "1453" },
    { question: "When did Christopher Columbus discover America?", answer: "1492" },
    { question: "When did Martin Luther start the Protestant Reformation?", answer: "1517" },
    { question: "When did the Spanish Armada get defeated?", answer: "1588" },
    { question: "When did the Mayflower land at Plymouth Rock?", answer: "1620" },
    { question: "When did the English Civil War begin?", answer: "1642" },
    { question: "When was the Glorious Revolution?", answer: "1688" },
    { question: "When was the United States Constitution ratified?", answer: "1788" },
    { question: "When did the French Revolution begin?", answer: "1789" },
    { question: "When did Napoleon Bonaparte become Emperor of France?", answer: "1804" },
    { question: "When did the War of 1812 begin?", answer: "1812" },
    { question: "When did the Battle of Waterloo occur?", answer: "1815" },
    { question: "When did the Mexican-American War begin?", answer: "1846" },
    { question: "When did the California Gold Rush begin?", answer: "1848" },
    { question: "When did the American Civil War begin?", answer: "1861" },
    { question: "When was the Emancipation Proclamation issued?", answer: "1863" },
    { question: "When did the American Civil War end?", answer: "1865" },
    { question: "When was the telephone invented?", answer: "1876" },
    { question: "When did the Eiffel Tower open?", answer: "1889" },
    { question: "When did the Wright brothers fly the first airplane?", answer: "1903" },
    { question: "When did the Titanic sink?", answer: "1912" },
    { question: "When did the Russian Revolution begin?", answer: "1917" },
    { question: "When was the League of Nations founded?", answer: "1920" },
    { question: "When did the stock market crash, starting the Great Depression?", answer: "1929" },
    { question: "When did Adolf Hitler become Chancellor of Germany?", answer: "1933" },
    { question: "When did World War II begin?", answer: "1939" },
    { question: "When did the attack on Pearl Harbor occur?", answer: "1941" },
    { question: "When was D-Day?", answer: "1944" },
    { question: "When did the United Nations form?", answer: "1945" },
    { question: "When did India gain independence from Britain?", answer: "1947" },
    { question: "When was the state of Israel founded?", answer: "1948" },
    { question: "When did the Korean War begin?", answer: "1950" },
    { question: "When did the Vietnam War begin?", answer: "1955" },
    { question: "When was the Cuban Missile Crisis?", answer: "1962" },
    { question: "When did Martin Luther King Jr. deliver his 'I Have a Dream' speech?", answer: "1963" },
    { question: "When did the first man land on the moon?", answer: "1969" },
    { question: "When did the Watergate scandal break?", answer: "1972" },
    { question: "When did the Vietnam War end?", answer: "1975" },
    { question: "When did the Iranian Revolution occur?", answer: "1979" },
    { question: "When did the Chernobyl disaster happen?", answer: "1986" },
    { question: "When did the Soviet Union collapse?", answer: "1991" },
    { question: "When did the Rwandan Genocide occur?", answer: "1994" },
    { question: "When did Hong Kong return to China?", answer: "1997" },
    { question: "When did the September 11 attacks occur?", answer: "2001" },
    { question: "When did the Iraq War begin?", answer: "2003" },
    { question: "When did Hurricane Katrina strike New Orleans?", answer: "2005" },
    { question: "When did Barack Obama become President of the United States?", answer: "2008" },
    { question: "When did the Arab Spring begin?", answer: "2010" },
    { question: "When did the Brexit referendum occur?", answer: "2016" },
    { question: "When did the COVID-19 pandemic begin?", answer: "2019" },
    { question: "When did the U.S. Capitol riot occur?", answer: "2021" },
    { question: "When did the Mars Perseverance rover land?", answer: "2021" },
    { question: "When did Joe Biden become President of the United States?", answer: "2021" },
    { question: "When did the Suez Canal get blocked by the Ever Given?", answer: "2021" },
    { question: "When did Russia invade Ukraine?", answer: "2022" },
    { question: "When was Queen Elizabeth II's Platinum Jubilee?", answer: "2022" },
    { question: "When did the World Health Organization declare COVID-19 a pandemic?", answer: "2020" },
    { question: "When did George Floyd's death occur, sparking worldwide protests?", answer: "2020" },
    { question: "When was the Paris Agreement on climate change signed?", answer: "2015" },
    { question: "When did Nelson Mandela become President of South Africa?", answer: "1994" },
    { question: "When did the Tiananmen Square Massacre happen?", answer: "1989" },
    { question: "When did the Iranian Hostage Crisis begin?", answer: "1979" },
    { question: "When did the Apollo 11 moon landing occur?", answer: "1969" },
    { question: "When did the Six-Day War between Israel and Arab states occur?", answer: "1967" },
    { question: "When did the Civil Rights Act pass in the United States?", answer: "1964" },
    { question: "When did the Bay of Pigs Invasion occur?", answer: "1961" },
    { question: "When did the Cuban Revolution end?", answer: "1959" },
    { question: "When was NATO founded?", answer: "1949" },
    { question: "When did the Marshall Plan begin?", answer: "1948" },
    { question: "When was the United Nations Universal Declaration of Human Rights adopted?", answer: "1948" },
    { question: "When did the Battle of Stalingrad end?", answer: "1943" },
    { question: "When did Japan attack Pearl Harbor?", answer: "1941" },
    { question: "When did the Nuremberg Trials begin?", answer: "1945" },
    { question: "When did the League of Nations dissolve?", answer: "1946" },
    { question: "When did the Spanish Civil War begin?", answer: "1936" },
    { question: "When did Mahatma Gandhi lead the Salt March?", answer: "1930" },
    { question: "When was the Treaty of Versailles signed?", answer: "1919" },
    { question: "When did the Bolshevik Revolution occur?", answer: "1917" },
    { question: "When was the Lusitania sunk?", answer: "1915" },
    { question: "When did the Titanic set sail?", answer: "1912" },
    { question: "When was the Panama Canal completed?", answer: "1914" },
    { question: "When did the Boxer Rebellion in China end?", answer: "1901" },
    { question: "When did the Spanish-American War begin?", answer: "1898" },
    { question: "When was the first modern Olympic Games held?", answer: "1896" },
    { question: "When did the Eiffel Tower open?", answer: "1889" },
    { question: "When did the American Civil War begin?", answer: "1861" },
    { question: "When was the Emancipation Proclamation issued?", answer: "1863" },
    { question: "When was the Battle of Gettysburg?", answer: "1863" },
    { question: "When did the American Civil War end?", answer: "1865" }
];

app.get('', (req, res) => {
    res.json(questions);
});

// Endpoint to get a random historical question
app.get('/api/question', (req, res) => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  res.json(question);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});