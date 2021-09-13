let input, button, heading, subheading, output;
let birthList;

function setup() {
  // create canvas
  createCanvas(windowWidth-100, windowHeight-100);

  birthList = ['790816', '970719', '920713', '970716', '951014', '000319', '951105', '010106', '021012', '960120'
    , '931229', '871129', '000131', '971008', '001231', '980414', '010215', '000105', '990410', '000130', '910227'];

  input = createInput();
  input.position(windowWidth/2-input.width-60, windowHeight/3+30);
  input.style('height', '45px');
  input.style('font-size', '20px');

  button = createButton('확인');
  button.position(input.x + input.width + 80, windowHeight/3+30);
  button.style('height', '51px');
  button.style('font-size', '20px');
  button.mousePressed(() => {
    const name = input.value();
    for (let i = 0; i < birthList.length; i++) {
        if (name == birthList[i]) {
            output.style('color', 'green')
            output.html('처음부터 끝까지 성실하게 참여했기에 참가비 지급 대상입니다!');
            break;
        }
        else {
            output.style('color', 'grey')
            output.html('토, 일 중 라이브 방송을 참가하지 않은 날이 있어 참가비 지급 대상이 아닙니다.');
        }
    } 
    input.value('');    
  });

  heading = createElement('h2', '생년월일 6자리를 입력해주세요');
  heading.position(windowWidth/2-input.width-60, windowHeight/3-65);

  subheading = createElement('h3', '(예: 920101)')
  subheading.position(windowWidth/2-input.width-60, windowHeight/3-22);

  output = createElement('div', '');
  output.style('text-align', 'center');
  output.style('font-size', '20px');
  output.style('font-weight', 'bold');
  output.position(windowWidth/2-input.width-60, windowHeight/3+100);

  textAlign(CENTER);
  textSize(50);
}

function keyPressed() {
    if (keyCode === ENTER) {
        const name = input.value();
        for (let i = 0; i < birthList.length; i++) {
            if (name == birthList[i]) {
                output.style('color', 'green')
                output.html('처음부터 끝까지 성실하게 참여했기에 참가비 지급 대상입니다!');
                break;
            }
            else {
                output.style('color', 'grey')
                output.html('토, 일 중 라이브 방송을 참가하지 않은 날이 있어 참가비 지급 대상이 아닙니다.');
            }
        } 
        input.value('');  
    }
}