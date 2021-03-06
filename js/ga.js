var chrom = 2; // 染色体数　回転角、左右
var herd = 50; //　個体数
var elite = 2; //保存エリート数
var gene = 50; //世代数
var muta = 100; //突然変異の確率分母

var move = 20; //横の長さの仮の数値,画面左端からいくつかの意
var spin = 8; //360度回すまでの操作数

var indi[herd][chrom]; //一個体
var fit[herd]; //適応度 出来れば次の手での撃破率を入れたい
var nextindi[herd][chrom]; //次世代の個体群

var cnt = 0;
//適応度計算
function cal_fit() { //実機ができてから
    //次の手を適当なダミーブロック、または全ブロックでシミュレーションして次の手での撃破率を測りたい。
}
//順位による並べ替え
function sort(leftsta, rightsta) {

    //仮にC言語での同機能を移植、改変している
    var left = leftsta,
        right = rightsta,
        Gtmp;
    var pivot, Ftmp;
    var i;
    var pivotindex = (left + right) / 2;

    pivot = fit[pivotindex];

    //クイックソート(昇順)
    //*適応度が低いほど答えに近づく
    while (1) {

        while (fit[left] < pivot) {

            //軸にあたるまで右側へ
            left++;

        }
        while (fit[right] > pivot) {

            //軸にあたるまで左側へ
            right--;

        }
        if (left >= right) {

            //軸が交差したら終了
            break;

        }

        //入れ替え（適応度）
        Ftmp = fit[left];
        fit[left] = fit[right];
        fit[right] = Ftmp;

        //入れ替え（染色体）
        for (i = 0; i < chrom; i++) {

            Gtmp = indi[left][i];
            indi[left][i] = indi[right][i];
            indi[right][i] = Gtmp;

        }

        left++;
        right--;
    }
}
//交叉
function cross(i, parent) {
    //一様交叉
    var side1, side2, k;
    //ランダムに両方の親の染色体を入れ替え、新たに2つの個体として次の世代に残す。


    for (k = 0; k < chrom; k++) {

        side1 = 1;
        side2 = Math.random() * 2;
        side1 -= side2;
        nextindi[i][k] = indi[parent[side1]][k];
        nextindi[i + 1][k] = indi[parent[side2]][k];

    }
}
//親の選択
function pare_choice() {
    //Cでの同機能を改変 ランキング選択

    var num = herd,
        r, i, j, h, parent[2];
    var sum;

    CanvasRenderingContext2D side1, side2;

    //優秀な２個体を保存
    for (h = 0; h < chrom; h++) {

        nextindi[0][h] = indi[0][h];
        nextindi[1][h] = indi[1][h];

    }


    //優秀な２個体を保存するためにiはeliteからスタート
    for (i = elite; i < herd; i += 2) {

        //ランキング選択による選別
        for (j = 0; j < 2; j++) {

            num = herd;
            //個体数１～herdまですべて足した値と同じ値をこの式で求める。
            sum = (long)((herd + 1) * herd / 2);
            //sum以下の数からrをランダムに選ぶ
            r = ((rand() << 16) + (rand() << 1) + rand() % 2) % sum + 1;

            //numの値をrから引きながら、numをだんだん小さくしていく。ｒがnum以下になったときの個体数引くnumが親となる
            while (num < r) {

                r -= num;
                num--;

            }

            parent[j] = herd - num;

        }
        cross(i, parent); //交叉
    }
    //個体のコピー
    memcpy(indi, nextindi, sizeof(indi));
}

//突然変異
function muta() {
    var i, k;

    for (i = elite; i < herd; i++) {

        for (k = 0; k < chrom; k++) {

            if (Math.random() * muta < 1) {

                indi[i][k] = abs(indi[i][k] - 1);
                //INDI個の個体のうち一つの染色体のうち一つを別の染色体にする

            }

        }

    }
}



//メイン処理
//ここでデータを取得する                                                        
while (cnt < gene) {
    var i = 0,
        if (cnt < 1) {
            for (i = 0; i < herd; i++) {
                //ランダムに個体を生成する
                indi[i][0] = Math.random() * spin;
                indi[i][1] = Math.random() * move;
                console.log(indi[i][0], indi[i][1]);
            }
        }

    if (cnt > 0) {
        pare_choice(); //親の選択・交叉


        muta(); //突然変異
    }

    cal_fit(); //適応度計算
    sort(0, herd - 1); //適応度順に並び変え

    cnt++;
}

//ここでアウトプット
