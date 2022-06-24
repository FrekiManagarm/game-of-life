class JeudelaVie {

    constructor() {

        this.tailleCellule = 2;
        this.color_mort = `#181818`;
        this.color_vie = `#FFFFFF`;
        this.cells_in_column = Math.floor(canvas.width / this.tailleCellule);
        this.cells_in_rows = Math.floor(canvas.height / this.tailleCellule);
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

        this.dispoAleatoire = () => {

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
                        color = this.color_vie;
                    else
                        color = this.color_mort;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.tailleCellule, i * this.tailleCellule, this.tailleCellule, this.tailleCellule);
                }
            }

        };

        this.cellulePosition = (ligne, colonne) => {
            try {
                return this.tableau_actif[ligne][colonne];
            }
            catch {
                return 0;
            }
        };

        this.voisins = (ligne, colonne) => {
            let totalVoisins = 0;
            totalVoisins = totalVoisins + this.cellulePosition(ligne - 1, colonne - 1);
            totalVoisins = totalVoisins + this.cellulePosition(ligne - 1, colonne);
            totalVoisins = totalVoisins + this.cellulePosition(ligne - 1, colonne + 1);
            totalVoisins = totalVoisins + this.cellulePosition(ligne, colonne - 1);
            totalVoisins = totalVoisins + this.cellulePosition(ligne, colonne + 1);
            totalVoisins = totalVoisins + this.cellulePosition(ligne + 1, colonne - 1);
            totalVoisins = totalVoisins + this.cellulePosition(ligne + 1, colonne);
            totalVoisins = totalVoisins + this.cellulePosition(ligne + 1, colonne + 1);
            return totalVoisins;
        };

        // mise à jour de l'état de la cellule à l'instant T

        this.majCellule = (ligne, colonne) => {

            const total = this.voisins(ligne, colonne);

            if (total > 4 || total < 3) {
                return 0;
            } else if (this.tableau_actif[ligne][colonne] === 0 && total === 3) {
                return 1;
            } else {
                return this.tableau_actif[ligne][colonne];
            }

        };

        // processus de vie ou de mort des cellules

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