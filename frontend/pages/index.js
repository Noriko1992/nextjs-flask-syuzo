import { useState } from 'react';
import { Yuji_Syuku } from "next/font/google";

// Googleフォントの設定
const yujiSyuku = Yuji_Syuku({
  subsets: ['latin'],
  weight: '400',
});

// 使用する画像のパスを配列として定義
const images = [
  "/images/image2.jpg", "/images/image3.jpg", "/images/image4.jpg", "/images/image5.jpg",
  "/images/image6.jpg", "/images/image7.jpg", "/images/image8.jpg", "/images/image9.jpg",
  "/images/image10.jpg", "/images/image11.jpg", "/images/image12.jpg", "/images/image13.jpg",
  "/images/image14.jpg", "/images/image15.jpg", "/images/image16.jpg", "/images/image17.jpg",
  "/images/image18.jpg", "/images/image19.jpg", "/images/image20.jpg",
];

const Home = () => {
  const [pref, setPref] = useState('');  // 入力された部位の情報を保持
  const [newsResponse, setNewsResponse] = useState('');  // 筋トレメニューの結果を保持
  const [randomImage, setRandomImage] = useState(null);  // ランダム画像の初期状態は非表示

  const handleNews = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:5000/api/news/${pref}`, {
      method: 'GET',
    });
    const data = await res.json();
    console.log("prefリクエストの結果:", data.news);
    setNewsResponse(data.news); // 取得した筋トレメニューを状態に保存
    setRandomImage(getRandomImage());  // ランダム画像を設定
    setPref('');  // 入力フィールドをリセット
  };

  // ランダムに画像を選ぶ関数
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className={`${yujiSyuku.className} text-red-500 text-3xl font-bold text-center`}>
        松岡修造の熱血ワークアウト
      </h1>
      <h2 className={`${yujiSyuku.className} text-xl text-center`}>鍛えたい部位を入力してくれ!</h2>
      <form onSubmit={handleNews} className={`${yujiSyuku.className} flex flex-col items-center space-y-2`}>
        <input
          type="text"
          value={pref}
          onChange={(e) => setPref(e.target.value)}
          placeholder="今日は腕？上半身？全身？上腕二頭筋？"
          className="border border-gray-300 p-2 rounded w-80 max-w-lg"
        />
        {/* ここでは最初の固定画像を表示 */}
        <img src="/images/image1.jpg" alt="shuzo" width="200" height="100"/>
        <button className="bg-blue-500 hover:bg-red-700 text-white items-center px-2 py-1">
          君は一人じゃない！
        </button>
      </form>
      {newsResponse && (
        <div className="border border-gray-300 p-4 rounded mt-4">
          <p className={`${yujiSyuku.className}`}>筋トレメニュー: {newsResponse}</p>
          {/* randomImageが存在する場合のみ表示 */}
          {randomImage && (
            <div className="flex justify-center items-center mt-4">
              <img src={randomImage} alt="shuzo" width="200" height="100" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
