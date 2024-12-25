<script>
  import { fade } from 'svelte/transition';
  import confetti from "canvas-confetti";

  let questions = [
  {
    question: "Who is this Cutie?",
    picture: "/game/images/Ariane.jpeg", // Updated path
    options: ["Lauren Watson", "Anna Oakes", "Laura Kukkonen", "Yixiao Ren", "Carla Mandiola", "Natalia Belizario", "Ariane Luthi"],
    answer: "Ariane Luthi",
  },
  {
    question: "Who is this Auntie?",
    picture: "/images/Lauren.png", // Updated path
    options: ["Laura Kukkonen", "Carla Mandiola", "Ariane Luthi", "Yixiao Ren", "Anna Oakes", "Lauren Watson", "Natalia Belizario"],
    answer: "Lauren Watson",
  },
  {
    question: "Can you guess who she is?",
    picture: "images/Natalia.png", // Updated path
    options: ["Yixiao Ren", "Natalia Belizario", "Ariane Luthi", "Anna Oakes", "Laura Kukkonen", "Carla Mandiola", "Lauren Watson"],
    answer: "Natalia Belizario",
  },
  {
    question: "You have seen this face before",
    picture: "images/Carla.png", // Updated path
    options: ["Carla Mandiola", "Yixiao Ren", "Anna Oakes", "Lauren Watson", "Natalia Belizario", "Laura Kukkonen", "Ariane Luthi"],
    answer: "Carla Mandiola",
  },
  {
    question: "Oh, who is she?",
    picture: "images/Yixiao.png", // Updated path
    options: ["Natalia Belizario", "Lauren Watson", "Ariane Luthi", "Yixiao Ren", "Anna Oakes", "Carla Mandiola", "Laura Kukkonen"],
    answer: "Yixiao Ren",
  },
  {
    question: "Who is this little kid?",
    picture: "images/Laura.png", // Updated path
    options: ["Ariane Luthi", "Yixiao Ren", "Anna Oakes", "Carla Mandiola", "Laura Kukkonen", "Natalia Belizario", "Lauren Watson"],
    answer: "Laura Kukkonen",
  },
  {
    question: "Same energy, who is she?",
    picture: "images/Anna.jpg", // Updated path
    options: ["Yixiao Ren", "Laura Kukkonen", "Natalia Belizario", "Lauren Watson", "Ariane Luthi", "Anna Oakes", "Carla Mandiola"],
    answer: "Anna Oakes",
  },
];


  let currentQuestionIndex = 0;
  let score = 0;
  let selectedOption = null;
  let showResult = false;
  let resultsReady = false;

  function selectAnswer(option) {
    selectedOption = selectedOption === option ? null : option;
  }

  function nextQuestion() {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      score++;
    }

    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      selectedOption = null;
    } else {
      showResult = true;
      setTimeout(() => {
        resultsReady = true;
        if (score === questions.length) {
          celebratePerfectScore();
        } else {
          celebrate();
        }
      }, 500);
    }
  }

  function restartGame() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    showResult = false;
    resultsReady = false;
  }

  function celebrate() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  }

  function celebratePerfectScore() {
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.4 },
      colors: ["#ffd700", "#e5e4e2"],
    });
  }
</script>

<main>
  <h1>Guess the Auntie Game!</h1>

  {#if resultsReady}
    <div transition:fade>
      <p>You got {score} out of {questions.length} correct!</p>
      <button on:click={restartGame}>Play Again</button>
    </div>
  {:else if showResult}
    <div transition:fade></div>
  {:else}
    <div transition:fade>
      <p>{questions[currentQuestionIndex].question}</p>
      {#if questions[currentQuestionIndex].picture}
        <img src={questions[currentQuestionIndex].picture} alt="Person to guess" />
      {:else}
        <p>(No image available)</p>
      {/if}
      <div>
        {#each questions[currentQuestionIndex].options as option}
          <button
            on:click={() => selectAnswer(option)}
            class:selected={selectedOption === option}
          >
            {option}
          </button>
        {/each}
      </div>
      {#if selectedOption}
        <button class="next-button" on:click={nextQuestion}>Next</button>
      {/if}
    </div>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  main {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 15px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  img {
    max-width: 80%;
    max-height: 400px;
    height: auto;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 10px solid white;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  button {
    margin: 8px;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    background: #ff6f61;
    color: white;
    border-radius: 25px;
    transition: all 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  button:hover {
    background: #ff3b2f;
    transform: translateY(-1px);
  }

  button.selected {
    background-color: #9C0D38;
    color: white;
  }

  button.next-button {
    margin: 12px;
    padding: 14px 20px;
    font-size: 18px;
    font-weight: bold;
    background: #F3A712;
    border-radius: 30px;
    transition: all 0.3s ease;
  }

  button.next-button:hover {
    background: #F3A712;
    transform: translateY(-2px);
  }

  button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
</style>
