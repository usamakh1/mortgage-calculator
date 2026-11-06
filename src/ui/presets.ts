/**
 * Loan product selector (M1). Lists "Custom" plus the config presets in config order.
 * Choosing a preset fills and locks rate and term (app.ts); "Custom" unlocks them (M1.4, M1.6).
 * Names and descriptions are set with textContent only.
 */
import type { Preset } from '../config/defaults';
import { UI_TEXT } from '../messages';

export interface PresetSelector {
  element: HTMLElement;
}

export const PRESET_SELECT_ID = 'field-preset';
const DESCRIPTION_ID = 'field-preset-description';

/**
 * Returns null when there are no presets, so no selector is shown (M1.8).
 * `onChange` receives the chosen preset, or null for "Custom".
 */
export function createPresetSelector(
  presets: readonly Preset[],
  onChange: (preset: Preset | null) => void,
): PresetSelector | null {
  if (presets.length === 0) return null;

  const wrapper = document.createElement('div');
  wrapper.className = 'field field-preset';

  const label = document.createElement('label');
  label.htmlFor = PRESET_SELECT_ID;
  label.textContent = UI_TEXT.loanProduct;

  const select = document.createElement('select');
  select.id = PRESET_SELECT_ID;
  select.name = 'preset';
  const custom = document.createElement('option');
  custom.value = '';
  custom.textContent = UI_TEXT.custom;
  select.append(custom);
  for (const preset of presets) {
    const option = document.createElement('option');
    option.value = preset.id;
    option.textContent = preset.name;
    select.append(option);
  }
  select.value = ''; // "Custom" on load (M1.1)

  const description = document.createElement('p');
  description.id = DESCRIPTION_ID;
  description.className = 'field-hint';

  select.addEventListener('change', () => {
    const preset = presets.find((candidate) => candidate.id === select.value) ?? null;
    description.textContent = preset?.description ?? '';
    if (preset?.description) select.setAttribute('aria-describedby', DESCRIPTION_ID);
    else select.removeAttribute('aria-describedby');
    onChange(preset);
  });

  wrapper.append(label, select, description);
  return { element: wrapper };
}
