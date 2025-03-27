import { useEffect, useState } from 'react';
import NoteConstants from '../../../assets/js/constants/note-constants';
import './keyboard.css';

const areKeysEqual = (key, keyToCheck) => {
	return key.name == keyToCheck.name
		&& key.sharp == keyToCheck.sharp
		&& key.octave == keyToCheck.octave;
};

const trimLastAccidentalIfSpacer = (keyboardKeys) => {
	const lastAccidentalIndex = keyboardKeys.findLastIndex(key => key.sharp);
	if (keyboardKeys[lastAccidentalIndex].spacer) {
		keyboardKeys.splice(lastAccidentalIndex, 1);
	}
};

const getKeyboardKeys = (octaves) => {
    const keyboardKeys = [];
    for (let i = 0; i < octaves; i++) {
		const octaveKeys = NoteConstants.allNotes.map(note => ({
            name: note.name,
            sharp: note.sharp ?? false,
			spacer: note.spacer,
            octave: i,
		}));
		keyboardKeys.push(...octaveKeys);
    }

	trimLastAccidentalIfSpacer(keyboardKeys);

    return keyboardKeys;
};

const getNumberOfKeys = (octaves) => octaves * NoteConstants.allNotes.length;

const Keyboard = ({ octaves = 4 }) => {
	const [whiteKeys, setWhiteKeys] = useState([]);
	const [accidentalKeys, setAccidentalKeys] = useState([]);
	const [pressedKeys, setPressedKeys] = useState([]);

	const pressKey = (key) => {
		const newPressedKeys = [...pressedKeys, key];
		setPressedKeys(newPressedKeys);
	};

	const releaseKey = (key) => {
		const releasedKeys = pressedKeys.filter(x => areKeysEqual(key, x)).map(x => x);
		const newPressedKeys = [...pressedKeys];
		releasedKeys.forEach(k => {
			const foundKey = newPressedKeys.findIndex(x => areKeysEqual(k, x));
			if (foundKey >= 0) {
				newPressedKeys.splice(foundKey, 1);
			}
		});
		setPressedKeys(newPressedKeys);
	};

	useEffect(() => {
		const allKeyboardKeys = getKeyboardKeys(octaves);
		setWhiteKeys(allKeyboardKeys.filter(key => !key.sharp).map(x => x));
		setAccidentalKeys(allKeyboardKeys.filter(key => key.sharp).map(x => x));
	}, []);

	return (
		<div className='mdaw__keyboard' data-keys={getNumberOfKeys(octaves)}>
			<div className='mdaw__natural-keys'>
				{whiteKeys.map((key, index) => (
					<div key={`${index}-${key.name}`}
						data-key={`${key.name}${key.octave}`}
						className={['mdaw__keyboard-key', pressedKeys?.findIndex(k => areKeysEqual(key, k)) > 0 && 'mdaw__keyboard-key--pressed'].filter(x => x).join(' ')}
						onPointerDown={() => pressKey(key)}
						onPointerUp={() => releaseKey(key)}>
					</div>
				))}
			</div>
			<div className='mdaw__accidental-keys'>
				{accidentalKeys.map((key, index) => (
					<div key={`${index}-${key.name}-sharp`}
						data-key={`${key.name}#${key.octave}`}
						className={['mdaw__keyboard-key', key.spacer && 'mdaw__keyboard-key--spacer', pressedKeys?.findIndex(k => areKeysEqual(key, k)) > 0 && 'mdaw__keyboard-key--pressed'].filter(x => x).join(' ')}
						onPointerDown={() => pressKey(key)}
						onPointerUp={() => releaseKey(key)}>
					</div>
				))}
			</div>
		</div>
	);
};

export default Keyboard;