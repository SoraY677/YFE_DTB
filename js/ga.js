var chrom = 2; // 染色体数　回転角、左右 出来れば次の手での撃破率を入れたい
var herd = 50; //　個体数
var elite = 2; //保存エリート数
var gene = 50; //世代数
var muta = 11; //突然変異の確率分母

var move = 20; //横の長さの仮の数値,画面端からいくつかの意
var spin = 8; //360度回すまでの操作数

var indi[herd][chrom]; //一個体
var fit[herd];
var nextindi[herd][chrom];

var cnt = 0;

//ここでデータを取得する
while (cnt < gene) {
    var i = 0,
        if (cnt < 1) {
            for (i = 0; i < herd; i++) {
                //ランダムに個体を生成する
                indi[i][0] = Math.random() * spin;
                indi[i][1] = Math.random() * move;
            }
        }

    if (cnt > 0) {
        function pare_choice();//親の選択
        function cross();//交叉

        function muta();//突然変異
    }

    function cal_fit();//適応度計算
    function sort();//適応度順に並び変え

    cnt++;
}

//ここでアウトプット
