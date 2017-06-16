/*jshint esversion: 6*/
const App = {
  rootElement: '#app',
  selectedColor: 'white',
  numRows: 10,
  numCols: 10,
  cellWidth: 25,
  cellHeight: 25,
  grid: [],
  start: function(){
    this.cacheDOM();
    this.makeGrid();
    this.bindEvents();
    this.render();
  },
  makeGrid: function(){
    this.grid = new Array(this.numRows);
    for(let rowIndex = 0; rowIndex < this.numRows; rowIndex+=1){
      this.grid[rowIndex] = new Array(this.numCols);
      for(let colIndex=0; colIndex < this.numCols; colIndex+=1){
        this.grid[rowIndex][colIndex] = new Cell(this.cellWidth, this.cellHeight, this.selectedColor);
      }
    }
    console.log(this.grid);
  },
  cacheDOM: function(){
    this.root = document.querySelector(this.rootElement);
  },
  bindEvents: function(){},
  changeColor: function(rowIndex, colIndex){
    const cell = this.grid[rowIndex][colIndex];
    cell.color = this.selectedColor;
    this.render();
  },
  resetGrid: function(){
    console.log('resetting the grid');
    this.selectedColor = 'white';
    this.makeGrid();
    this.render();
  },
  render: function(){
    this.root.innerHTML = '';
    //this is the dynamic reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', () => this.resetGrid());
    this.root.appendChild(resetButton);
    //this is the grid part below
    this.grid.forEach((row, rowIndex) =>{
      const rowContainer = document.createElement('div');

      rowContainer.style.height = `${this.cellHeight}px`;

      row.forEach((cell, colIndex) =>{
        const element = cell.toHtml();
        element.addEventListener('click', () => this.changeColor(rowIndex,colIndex));
        rowContainer.appendChild(element);
      });
      this.root.appendChild(rowContainer);
    });
  }
};

App.start();
