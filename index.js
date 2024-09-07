document.addEventListener('DOMContentLoaded', function () {
    const duties = document.querySelectorAll('.duty-item');
    const rights = document.querySelectorAll('.right-item');
    let correctMatches = 0;
  
    duties.forEach(duty => {
      duty.addEventListener('dragstart', dragStart);
    });
  
    rights.forEach(right => {
      right.addEventListener('dragover', dragOver);
      right.addEventListener('drop', drop);
    });
  
    document.getElementById('reset').addEventListener('click', resetGame);
  
    function dragStart(e) {
      e.dataTransfer.setData('text', e.target.id);
    }
  
    function dragOver(e) {
      e.preventDefault();
    }
  
    function drop(e) {
      e.preventDefault();
      const dutyId = e.dataTransfer.getData('text');
      const dutyElement = document.getElementById(dutyId);
  
      if (checkMatch(dutyId, e.target.dataset.duty)) {
        if (e.target.childElementCount === 0) { // Check if right is empty
          e.target.appendChild(dutyElement);
          dutyElement.draggable = false; // Disable dragging after correct match
          correctMatches++;
          checkWin();
        }
      } else {
        document.getElementById('result').textContent = 'Incorrect match! Try again.';
        document.getElementById('result').style.color = 'red';
      }
    }
  
    function checkMatch(dutyId, rightDuty) {
      return dutyId === rightDuty;
    }
  
    function checkWin() {
      if (correctMatches === rights.length) {
        document.getElementById('result').textContent = 'Congratulations! You matched all rights and duties correctly!';
        document.getElementById('result').style.color = 'green';
      }
    }
  
    function resetGame() {
      correctMatches = 0;
      duties.forEach(duty => {
        document.querySelector('.duties ul').appendChild(duty);
        duty.draggable = true; // Re-enable dragging
      });
      document.getElementById('result').textContent = '';
    }
  });
  