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

export const settings = {
  roundsToWin: 15,
  lightUpDuration: 300,
  pauseDuration: 1500,
  levels: {
    // NOTE: span in ms between the tiles lighting up, as lightUpDuration for the tiles is set to 300 ms
    easy: 1800,
    normal: 1300,
    hard: 700,
  }
}

export default {
  data() { 
      return {
      ...settings,
      tiles,
      gameState: "idle", // NOTE: other possible values are 'simonTurn', 'playerTurn', 'pause', 'gameOver', 'win'
      sequence: [],
      input: [],
      round: 0,
      message: null,
    }
  },
  methods: {
    handleTileClick(id) {
      if (this.gameState !== 'playerTurn' ) {
        return;
      }

      this.lightUp(id);
      this.input.push(id);
      
      if (this.input.length >= this.sequence.length) {
        this.gameState = "pause";
        setTimeout(() => this.playRound(), this.pauseDuration)
      }

      const index = this.input.length - 1;
      if (this.input[index] !== this.sequence[index]) {
        this.gameState = "gameOver";
        return;
      }
    },

    lightUp(id) {
      const tile = this.$refs[`tile-${id}`];
      const tone = this.$refs[`tone-${id}`];
      
      tile.opacity = 0.5;
      tone.play();

      setTimeout(() => {
        tile.opacity = 1
      }, this.lightUpDuration);
    },
    
    playRound(level) {
      if (this.gameState === 'gameOver') {
        return;
      }

      if (this.sequence.length === this.roundsToWin) {
        this.gameState = 'win';
        return;
      }
      
      if (level) {
        this.span = this.levels[level];
      }

      this.gameState = "simonTurn";
      this.input = [];
      this.round += 1;
      this.sequence.push(this.getRandomTileId());
      
      this.sequence.forEach((id, index) => {
        setTimeout(() => {
          this.lightUp(id);
        }, (index + 1) * this.span);
      });      

      setTimeout(() => {
        this.gameState = "playerTurn";
      }, this.round * this.span + this.pauseDuration);
    },
    getRandomTileId() {
      return Math.floor(Math.random() * tiles.length);
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
        case 'pause':
          this.message = `(Round ${this.round}/${this.roundsToWin}) Great job!`;
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
