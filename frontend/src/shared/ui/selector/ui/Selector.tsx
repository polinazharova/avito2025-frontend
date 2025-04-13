import { useState } from 'react';
import './Selector.styles.scss';

interface SelectorProps {
  options: { [key: string]: string[] | null };
  preSelected?: string | number | null;
  handleOptionClick: React.MouseEventHandler<Element>;
}

const Selector: React.FC<SelectorProps> = ({
  options,
  preSelected = null,
  handleOptionClick = () => {},
}: SelectorProps) => {
  const [selectedOption, setSelectedOption] = useState<string | number | null>(preSelected);

  const handleTitleClick = (event: React.MouseEvent) => {
    const parent = (event.target as HTMLElement)?.parentNode as HTMLElement;
    const optionsElem = parent.getElementsByClassName('selector__options')[0];
    optionsElem.classList.toggle('selector__options_hidden');
  };

  const onClickOption = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target) {
      let isContaining = false;
      if (target.classList.contains('selector__option_chosen')) {
        isContaining = true;
      }
      if (!isContaining) {
        setSelectedOption(target.textContent);
      } else {
        setSelectedOption(null);
      }
      handleOptionClick(event);

      const parent = target.parentNode as HTMLElement;
      parent?.classList.toggle('selector__options_hidden');
    }
  };

  return (
    <div className='selector'>
      {Object.keys(options).map((title, index) => (
        <div key={'selector' + title + index} className='selector__group'>
          <span className='selector__title' onClick={handleTitleClick}>
            {title}
            {selectedOption ? `: ${selectedOption}` : ''}
          </span>
          <div className='selector__options selector__options_hidden'>
            {options?.[title]?.map((option, index) => (
              <span
                key={'selector' + option + index}
                className={`selector__option ${selectedOption == option ? 'selector__option_chosen' : ''}`}
                onClick={onClickOption}
              >
                {option}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Selector;
