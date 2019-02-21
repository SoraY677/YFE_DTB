//個体群を適応度ごとに並べ替える
//適応度をもとに、順位を各個体配列の末尾に入力する
//仮にCで使ったものを置いて改変する
function sort(int leftsta,int rightsta) {

    int left = leftsta, right = rightsta, Gtmp;
    double pivot, Ftmp;
    int i;
    int pivotindex = (left + right) / 2;

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
        for (i = 0; i < N;i++) {

            Gtmp = gene[left][i];
            gene[left][i] = gene[right][i];
            gene[right][i] = Gtmp;

        }

        left++;
        right--;
    }
