import { memo, useCallback, useEffect } from 'react';

import { useRecoilState } from 'recoil';

import { BannerSliderPositionAtom } from 'module/login-logout/recoil';

const SliderButton = memo(({ position }) => {
  const [currentPosition, setCurrentPosition] = useRecoilState(BannerSliderPositionAtom);
  const selected = currentPosition === position;

  const onClick = useCallback(
    () => !selected && setCurrentPosition(position),
    [position, selected, setCurrentPosition]
  );

  // Solution tried:
  // - setInterval: when the user clicks, it does NOT wait for 15s before jumping to the next
  //   => Not working.
  // - setTimeout after EACH update: does wait 15s
  //   => Current solution.
  useEffect(() => {
    // Without this guard, setCurrentPosition is executed for each of the 3 buttons
    // It does not cause jump (due to batching?) but not optimal
    if (selected) {
      // Not (curr + 1) % 3, as position/curr is 1-based
      const timerId = setTimeout(() => setCurrentPosition((curr) => (curr % 3) + 1), 5000);
      return () => clearTimeout(timerId);
    }
  }, [selected, setCurrentPosition]);

  return (
    <button
      onClick={onClick}
      style={{
        outline: 'none',
        cursor: 'pointer',
        background: selected ? 'var(--chakra-colors-secondary-1)' : 'rgba(236, 205, 255, 0.5)',
        width: selected ? '30px' : '12px',
        height: '12px',
        borderRadius: '4px',
        transitionDuration: '200ms'
      }}
    ></button>
  );
});

export default SliderButton;
