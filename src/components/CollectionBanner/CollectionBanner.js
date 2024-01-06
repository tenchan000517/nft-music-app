// CollectionBanner.js
import React from 'react';
import Slider from 'react-slick';
import bannerConfig from '../../utils/BannerConfig';  // BannerConfig.js をインポート
import BannerCard from './BannerCard';
import './CollectionBanner.css'; // スタイルシートのインポート

const CollectionBanner = () => {
  // Configからバナーデータを取得
  const banners = bannerConfig.collections.map(collection => ({
    ...collection,
    image: collection.bannerImage || collection.sampleImage // バナー画像がない場合、サンプル画像を使用
  }));

// Sliderの設定
const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    variableWidth: true,
    margin: 30, // バナー間のマージンを30pxに設定
    responsive: [
      {
        breakpoint: 640, // スマートフォンのビューポートサイズで適用
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          variableWidth: true, // 変動幅を有効に
          centerMode: false, // センターモードを無効に
        }
      }
      // 他のビューポートサイズの設定を追加可能
    ]
  };

  return (
    <div>
    <h2 className="collection-banner-title">ピックアップ</h2> {/* タイトルを追加 */}
    <div className="collection-banner"> {/* ここにクラスを適用 */}

    <Slider {...sliderSettings}>
      {banners.map((banner, index) => (
        <div className="banner-card-container">
        <BannerCard key={index} banner={banner} />
        </div>

      ))}
    </Slider>
    </div>
    </div>

  );
};

export default CollectionBanner;
