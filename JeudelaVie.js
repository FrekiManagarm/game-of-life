class JeudelaVie {

    constructor() {

        this.cell_size = 5;
        this.dead_color = `#181818`;
        this.alive_color = `#FFFFFF`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.tableau_actif = [];
        this.tableau_inactif = [];

        this.tableauInit = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                this.tableau_actif[i] = [];
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.tableau_actif[i][j] = 0;
                }
            }
            this.tableau_inactif = this.tableau_actif;

        };

        this.arrayRandomize = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.tableau_actif[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let color;
                    if (this.tableau_actif[i][j] == 1)
                        color = this.alive_color;
                    else
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.cellulePosition = (row, col) => {
            try {
                return this.tableau_actif[row][col];
            }
            catch {
                return 0;
            }
        };

        this.voisins = (row, col) => {
            let total_neighbours = 0;
            total_neighbours += this.cellulePosition(row - 1, col - 1);
            total_neighbours += this.cellulePosition(row - 1, col);
            total_neighbours += this.cellulePosition(row - 1, col + 1);
            total_neighbours += this.cellulePosition(row, col - 1);
            total_neighbours += this.cellulePosition(row, col + 1);
            total_neighbours += this.cellulePosition(row + 1, col - 1);
            total_neighbours += this.cellulePosition(row + 1, col);
            total_neighbours += this.cellulePosition(row + 1, col + 1);
            return total_neighbours;
        };

        this.majCellule = (row, col) => {

            const total = this.voisins(row, col);
            // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
            if (total > 4 || total < 3) {
                return 0;
            }
            // dead cell with 3 neighbours becomes alive. 0 => 1
            else if (this.tableau_actif[row][col] === 0 && total === 3) {
                return 1;
            }
            // or returning its status back. 0 => 0; 1 => 1
            else {
                return this.tableau_actif[row][col];
            }

        };

        this.cestLaVie = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let new_state = this.majCellule(i, j);
                    this.tableau_inactif[i][j] = new_state;
                }
            }
            this.tableau_actif = this.tableau_inactif

        };

        this.gameSetUp = () => {
            this.tableauInit();
        };

        this.runGame = () => {
            this.cestLaVie();
            this.fillArray();
        };
        
    }
}