function initializeHero() {
  const hero = document.getElementById('hero-section');
  if (!hero) return;

  const bgElements = hero.querySelectorAll('.hero__bg');
  const indicators = hero.querySelectorAll('.hero__indicator');
  
  if (bgElements.length === 0) return;
  
  let currentIndex = 0;
  let slideInterval; 
  
  // 標準の切り替え間隔を 8000ms (8秒) に設定
  const standardInterval = 8000;
  // 初回のみ 5000ms (5秒) で切り替える
  const initialDelay = 5000;
  
  // スライドの表示を更新
  function updateSlide(index) {
    bgElements.forEach((bg, i) => {
      bg.classList.toggle('active', i === index);
    });
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    currentIndex = index;
  }
  
  // スライドを1つ進める処理
  const advanceSlide = () => {
    const nextIndex = (currentIndex + 1) % bgElements.length;
    updateSlide(nextIndex);
  };

  // インジケーターのクリックイベント
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      updateSlide(index);
      resetInterval(); 
    });
  });
  
  // スライドの自動切り替えを開始する関数
  function startInterval() {
    // 【初回待機時間短縮のロジック】
    // 1. setTimeoutを使い、初回のみ短い initialDelay (5秒) 後に advanceNext を実行
    slideInterval = setTimeout(function advanceNext() {
      advanceSlide();
      
      // 2. 実行後、standardInterval (8秒) の間隔で advanceNext を繰り返す
      slideInterval = setTimeout(advanceNext, standardInterval);
    }, initialDelay);
  }

  function resetInterval() {
    clearTimeout(slideInterval);
    startInterval();
  }

  // 初回実行
  updateSlide(currentIndex); // 初期のスライドを表示
  startInterval(); // タイマーを開始
}

document.addEventListener('DOMContentLoaded', initializeHero);