var chrom = 2; // æŸ“è‰²ä½“æ•°ã€€å›žè»¢è§’ã€�å·¦å�³
var herd = 50; //ã€€å€‹ä½“æ•°
var elite = 2; //ä¿�å­˜ã‚¨ãƒªãƒ¼ãƒˆæ•°
var gene = 50; //ä¸–ä»£æ•°
var muta = 100; //çª�ç„¶å¤‰ç•°ã�®ç¢ºçŽ‡åˆ†æ¯�

var move = 20; //æ¨ªã�®é•·ã�•ã�®ä»®ã�®æ•°å€¤,ç”»é�¢å·¦ç«¯ã�‹ã‚‰ã�„ã��ã�¤ã�‹ã�®æ„�
var spin = 8; //360åº¦å›žã�™ã�¾ã�§ã�®æ“�ä½œæ•°

var indi[herd][chrom]; //ä¸€å€‹ä½“
var fit[herd]; //é�©å¿œåº¦ å‡ºæ�¥ã‚Œã�°æ¬¡ã�®æ‰‹ã�§ã�®æ’ƒç ´çŽ‡ã‚’å…¥ã‚Œã�Ÿã�„
var nextindi[herd][chrom]; //æ¬¡ä¸–ä»£ã�®å€‹ä½“ç¾¤

var cnt = 0;
//é�©å¿œåº¦è¨ˆç®—
function cal_fit() { //å®Ÿæ©Ÿã�Œã�§ã��ã�¦ã�‹ã‚‰
    //æ¬¡ã�®æ‰‹ã‚’é�©å½“ã�ªãƒ€ãƒŸãƒ¼ãƒ–ãƒ­ãƒƒã‚¯ã€�ã�¾ã�Ÿã�¯å…¨ãƒ–ãƒ­ãƒƒã‚¯ã�§ã‚·ãƒŸãƒ¥ãƒ¬ãƒ¼ã‚·ãƒ§ãƒ³ã�—ã�¦æ¬¡ã�®æ‰‹ã�§ã�®æ’ƒç ´çŽ‡ã‚’æ¸¬ã‚Šã�Ÿã�„ã€‚
}
//é †ä½�ã�«ã‚ˆã‚‹ä¸¦ã�¹æ›¿ã�ˆ
function sort(leftsta, rightsta) {

    //ä»®ã�«Cè¨€èªžã�§ã�®å�Œæ©Ÿèƒ½ã‚’ç§»æ¤�ã€�æ”¹å¤‰ã�—ã�¦ã�„ã‚‹
    var left = leftsta,
        right = rightsta,
        Gtmp;
    var pivot, Ftmp;
    var i;
    var pivotindex = (left + right) / 2;

    pivot = fit[pivotindex];

    //ã‚¯ã‚¤ãƒƒã‚¯ã‚½ãƒ¼ãƒˆ(æ˜‡é †)
    //*é�©å¿œåº¦ã�Œä½Žã�„ã�»ã�©ç­”ã�ˆã�«è¿‘ã�¥ã��
    while (1) {

        while (fit[left] < pivot) {

            //è»¸ã�«ã�‚ã�Ÿã‚‹ã�¾ã�§å�³å�´ã�¸
            left++;

        }
        while (fit[right] > pivot) {

            //è»¸ã�«ã�‚ã�Ÿã‚‹ã�¾ã�§å·¦å�´ã�¸
            right--;

        }
        if (left >= right) {

            //è»¸ã�Œäº¤å·®ã�—ã�Ÿã‚‰çµ‚äº†
            break;

        }

        //å…¥ã‚Œæ›¿ã�ˆï¼ˆé�©å¿œåº¦ï¼‰
        Ftmp = fit[left];
        fit[left] = fit[right];
        fit[right] = Ftmp;

        //å…¥ã‚Œæ›¿ã�ˆï¼ˆæŸ“è‰²ä½“ï¼‰
        for (i = 0; i < chrom; i++) {

            Gtmp = indi[left][i];
            indi[left][i] = indi[right][i];
            indi[right][i] = Gtmp;

        }

        left++;
        right--;
    }
}
//äº¤å�‰
function cross(i, parent) {
    //ä¸€æ§˜äº¤å�‰
    var side1, side2, k;
    //ãƒ©ãƒ³ãƒ€ãƒ ã�«ä¸¡æ–¹ã�®è¦ªã�®æŸ“è‰²ä½“ã‚’å…¥ã‚Œæ›¿ã�ˆã€�æ–°ã�Ÿã�«2ã�¤ã�®å€‹ä½“ã�¨ã�—ã�¦æ¬¡ã�®ä¸–ä»£ã�«æ®‹ã�™ã€‚


    for (k = 0; k < chrom; k++) {

        side1 = 1;
        side2 = Math.random() * 2;
        side1 -= side2;
        nextindi[i][k] = indi[parent[side1]][k];
        nextindi[i + 1][k] = indi[parent[side2]][k];

    }
}
//è¦ªã�®é�¸æŠž
function pare_choice() {
    //Cã�§ã�®å�Œæ©Ÿèƒ½ã‚’æ”¹å¤‰ ãƒ©ãƒ³ã‚­ãƒ³ã‚°é�¸æŠž

    var num = herd,
        r, i, j, h, parent[2];
    var sum;

    CanvasRenderingContext2D side1, side2;

    //å„ªç§€ã�ªï¼’å€‹ä½“ã‚’ä¿�å­˜
    for (h = 0; h < chrom; h++) {

        nextindi[0][h] = indi[0][h];
        nextindi[1][h] = indi[1][h];

    }


    //å„ªç§€ã�ªï¼’å€‹ä½“ã‚’ä¿�å­˜ã�™ã‚‹ã�Ÿã‚�ã�«iã�¯eliteã�‹ã‚‰ã‚¹ã‚¿ãƒ¼ãƒˆ
    for (i = elite; i < herd; i += 2) {

        //ãƒ©ãƒ³ã‚­ãƒ³ã‚°é�¸æŠžã�«ã‚ˆã‚‹é�¸åˆ¥
        for (j = 0; j < 2; j++) {

            num = herd;
            //å€‹ä½“æ•°ï¼‘ï½žherdã�¾ã�§ã�™ã�¹ã�¦è¶³ã�—ã�Ÿå€¤ã�¨å�Œã�˜å€¤ã‚’ã�“ã�®å¼�ã�§æ±‚ã‚�ã‚‹ã€‚
            sum = (long)((herd + 1) * herd / 2);
            //sumä»¥ä¸‹ã�®æ•°ã�‹ã‚‰rã‚’ãƒ©ãƒ³ãƒ€ãƒ ã�«é�¸ã�¶
            r = ((rand() << 16) + (rand() << 1) + rand() % 2) % sum + 1;

            //numã�®å€¤ã‚’rã�‹ã‚‰å¼•ã��ã�ªã�Œã‚‰ã€�numã‚’ã� ã‚“ã� ã‚“å°�ã�•ã��ã�—ã�¦ã�„ã��ã€‚ï½’ã�Œnumä»¥ä¸‹ã�«ã�ªã�£ã�Ÿã�¨ã��ã�®å€‹ä½“æ•°å¼•ã��numã�Œè¦ªã�¨ã�ªã‚‹
            while (num < r) {

                r -= num;
                num--;

            }

            parent[j] = herd - num;

        }
        cross(i, parent); //äº¤å�‰
    }
    //å€‹ä½“ã�®ã‚³ãƒ”ãƒ¼
    memcpy(indi, nextindi, sizeof(indi));
}

//çª�ç„¶å¤‰ç•°
function muta() {
    var i, k;

    for (i = elite; i < herd; i++) {

        for (k = 0; k < chrom; k++) {

            if (Math.random() * muta < 1) {

                indi[i][k] = abs(indi[i][k] - 1);
                //INDIå€‹ã�®å€‹ä½“ã�®ã�†ã�¡ä¸€ã�¤ã�®æŸ“è‰²ä½“ã�®ã�†ã�¡ä¸€ã�¤ã‚’åˆ¥ã�®æŸ“è‰²ä½“ã�«ã�™ã‚‹

            }

        }

    }
}



//ãƒ¡ã‚¤ãƒ³å‡¦ç�†
//ã�“ã�“ã�§ãƒ‡ãƒ¼ã‚¿ã‚’å�–å¾—ã�™ã‚‹                                                        
while (cnt < gene) {
    var i = 0,
        if (cnt < 1) {
            for (i = 0; i < herd; i++) {
                //ãƒ©ãƒ³ãƒ€ãƒ ã�«å€‹ä½“ã‚’ç”Ÿæˆ�ã�™ã‚‹
                indi[i][0] = Math.random() * spin;
                indi[i][1] = Math.random() * move;
                console.log(indi[i][0], indi[i][1]);
            }
        }

    if (cnt > 0) {
        pare_choice(); //è¦ªã�®é�¸æŠžãƒ»äº¤å�‰


        muta(); //çª�ç„¶å¤‰ç•°
    }

    cal_fit(); //é�©å¿œåº¦è¨ˆç®—
    sort(0, herd - 1); //é�©å¿œåº¦é †ã�«ä¸¦ã�³å¤‰ã�ˆ

    cnt++;
}

//ã�“ã�“ã�§ã‚¢ã‚¦ãƒˆãƒ—ãƒƒãƒˆ
