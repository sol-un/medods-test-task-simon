const getRandomTileId = () => Math.floor(Math.random() * tiles.length);

const tiles = [
  {
    id: 0,
    color: "red",
  },
  {
    id: 1,
    color: "green",
  },
  {
    id: 2,
    color: "blue",
  },
  {
    id: 3,
    color: "yellow",
  },
];

const difficulties = {
  // NOTE: span in ms between the tiles lighting up (a tile stays lit for 300 ms)
  easy: 1800,
  normal: 1300,
  hard: 700,
};

export default {
  data() { 
      return {
      tiles,
      gameState: "idle", // NOTE: other possible values are 'simonTurn', 'playerTurn', 'gameOver', 'win'
      difficulties, 
      sequence: [],
      input: [],
      round: 0,
      roundsToWin: 15,
      message: null,
    }
  },
  methods: {
    handleTileClick(id) {
      if (this.gameState !== 'playerTurn') {
        return;
      }
      this.lightUp(id);
      this.input.push(id);
      const index = this.input.length - 1;
      if (this.input[index] !== this.sequence[index]) {
        this.gameState = "gameOver";
        return;
      }
      if (this.input.length >= this.sequence.length) {
        setTimeout(() => this.invokeNextRound() , 1000)
      }
    },

    playRound() {
      const { sequence } = this;
      sequence.forEach((id, index) => {
        setTimeout(() => {
          this.lightUp(id);
        }, (index + 1) * this.span);
      });
    },

    lightUp(id) {
      const tile = this.$refs[`tile-${id}`];
      const tone = this.$refs[`tone-${id}`];
      
      tile.opacity = 0.5;
      tone.play();

      setTimeout(() => (tile.opacity = 1), 300);
    },
    
    invokeNextRound(difficulty) {
      if (difficulty) {
        this.span = this.difficulties[difficulty];
      }
      if (this.sequence.length === this.roundsToWin) {
        this.gameState = 'win';
        return;
      }
      this.gameState = "simonTurn";
      this.input = [];
      this.round += 1;
      this.sequence.push(getRandomTileId());
      
      this.playRound();
      
      setTimeout(() => {
        this.gameState = "playerTurn";
      }, this.round * this.span + 1000);
    },
  },
  watch: {
    gameState: function(state) {
      switch (state) {
        case 'simonTurn':
          this.message = "Watch Simon...";
          break;
        case 'playerTurn':
          this.message = `(Round ${this.round}/${this.roundsToWin}) Your turn:`;
          break;
        case 'win':
         this.message = "You win! Refresh the page (F5) to try again.";
          break;
        case 'gameOver':
          this.message = "Game over! Refresh the page (F5) to try again.";
          break;
        default:
          throw new Error(`Unknown gameState value: ${state}`);
      }
    },
  }
};
