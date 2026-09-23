// Delningsknappar i sektionen "Hjälp en liten artist"
document.addEventListener('DOMContentLoaded', () => {
  const SPOTIFY_URL = 'https://open.spotify.com/artist/35x1x7RZaz5GPlIS4axyCd';
  const MESSAGE = 'Hej! Den här killen skriver riktigt bra barnmusik, jag tänkte på dig :)';
  const FULL_TEXT = MESSAGE + ' ' + SPOTIFY_URL;

  const nativeButton = document.getElementById('share-native');
  const messageButton = document.getElementById('share-copy');
  const preview = document.getElementById('share-preview');
  const hint = document.getElementById('share-hint');

  if (preview) preview.textContent = FULL_TEXT;

  const flash = (element, message) => {
    const label = element.querySelector('span:last-child') || element;
    const original = label.dataset.original || label.textContent;
    label.dataset.original = original;
    label.textContent = message;
    window.clearTimeout(Number(element.dataset.timer));
    element.dataset.timer = String(window.setTimeout(() => {
      label.textContent = original;
    }, 2500));
  };

  const copyText = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(FULL_TEXT);
        return true;
      } catch (error) {
        // faller igenom till reservlösningen
      }
    }
    try {
      const helper = document.createElement('textarea');
      helper.value = FULL_TEXT;
      helper.setAttribute('readonly', '');
      helper.style.position = 'fixed';
      helper.style.opacity = '0';
      document.body.appendChild(helper);
      helper.select();
      const copied = document.execCommand('copy');
      document.body.removeChild(helper);
      return copied;
    } catch (error) {
      return false;
    }
  };

  const selectMessage = () => {
    if (!preview || !window.getSelection || !document.createRange) return;
    const range = document.createRange();
    range.selectNodeContents(preview);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  };

  if (nativeButton && navigator.share) {
    nativeButton.hidden = false;
    nativeButton.addEventListener('click', async () => {
      try {
        await navigator.share({ title: 'Glitterdalen', text: MESSAGE, url: SPOTIFY_URL });
      } catch (error) {
        if (error && error.name === 'AbortError') return;
        if (await copyText()) flash(nativeButton, 'Texten är kopierad');
      }
    });
  }

  if (messageButton && hint) {
    messageButton.addEventListener('click', async () => {
      if (await copyText()) {
        flash(hint, 'Kopierat');
      } else {
        selectMessage();
        flash(hint, 'Markerat — kopiera själv');
      }
    });
  }
});
