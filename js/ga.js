var chrom = 2; // 染色体数　回転角、左右 出来れば次の手での撃破率を入れたい
var herd = 50; //　個体数
var elite = 2; //保存エリート数
var gene = 50; //世代数
var muta = 100; //突然変異の確率分母

var move = 20; //横の長さの仮の数値,画面端からいくつかの意
var spin = 8; //360度回すまでの操作数

var indi[herd][chrom]; //一個体
var fit[herd];
var nextindi[herd][chrom];

var cnt = 0;
//適応度計算
function cal_fit() {}
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
//親の選択
function pare_choice() {
    //Cでの同機能を改変

    var num = herd,
        r, i, j, h, parent[2];
    var sum;

    CanvasRenderingContext2D side1, side2;

    //優秀な２個体を保存
    for (h = 0; h < N; h++) {

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
    }
}
//交叉
function cross() {}
//突然変異
function muta() {}



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
        pare_choice(); //親の選択
        cross(); //交叉

        muta(); //突然変異
    }

    cal_fit(); //適応度計算
    sort(0, herd - 1); //適応度順に並び変え

    cnt++;
}

//ここでアウトプット
