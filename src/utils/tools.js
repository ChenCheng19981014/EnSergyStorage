import TweenMax from "./Anima";

// tween动画函数
export const anima = (begin, end, time, onUpdate, onComplete) => {
  let newBegin = { ...begin };
  let tween = new TweenMax(newBegin, time, end)
    .eventCallback("onUpdate", (_) => onUpdate && onUpdate(newBegin))
    .eventCallback("onComplete", (_) => {
      onComplete && onComplete();
      TweenMax.killTweensOf(tween);
      tween = null;
    });
  return tween;
};
