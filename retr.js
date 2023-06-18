let memos = [];

function loadMemos() {
  const storedMemos = localStorage.getItem('memos');
  if (storedMemos) {
    memos = JSON.parse(storedMemos);
    renderMemos();
  }
}

function saveMemos() {
  localStorage.setItem('memos', JSON.stringify(memos));
}

function addMemo() {
  const input = document.getElementById('memo-input');
  const memo = input.value;
  const imageInput = document.getElementById('memo-image-input');
  const imageFile = imageInput.files[0];

  if (memo || imageFile) {
    const reader = new FileReader();
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      memos.push({ memo, imageUrl });
      saveMemos();
      input.value = '';
      imageInput.value = '';
      renderMemos();
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    } else {
      reader.onload = null;
      reader.onloadend = null;
      reader.onerror = null;
      reader.abort();
    }
  }
}

function deleteImage(index) {
  memos[index].imageUrl = null;
  saveMemos();
  renderMemos();
}

function editMemo(index) {
  const memoObj = memos[index];
  const newMemo = prompt('메모를 수정하세요', memoObj.memo);

  if (newMemo) {
    memoObj.memo = newMemo;
    saveMemos();
    renderMemos();
  }
}

function editImage(index) {
  const memoObj = memos[index];
  const imageInput = document.createElement('input');
  imageInput.type = 'file';
  imageInput.accept = 'image/*';
  imageInput.onchange = function(event) {
    const imageFile = event.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const imageUrl = event.target.result;
        memoObj.imageUrl = imageUrl;
        saveMemos();
        renderMemos();
      };
      reader.readAsDataURL(imageFile);
    }
  };
  imageInput.click();
}

function deleteMemo(index) {
  memos.splice(index, 1);
  saveMemos();
  renderMemos();
}

function searchMemos() {
  const searchInput = document.getElementById('search-input');
  const searchText = searchInput.value.toLowerCase();
      const filteredMemos = memos.filter(memo => memo.memo.toLowerCase().includes(searchText));
      renderMemos(filteredMemos);
    }

    function renderMemos(memosToRender) {
      const memoList = document.getElementById('memo-list');
      memoList.innerHTML = '';

      const memosToDisplay = memosToRender || memos;

      for (let i = 0; i < memosToDisplay.length; i++) {
        const memoObj = memosToDisplay[i];
        const listItem = document.createElement('li');
        listItem.textContent = memoObj.memo;

        if (memoObj.imageUrl) {
          const imageContainer = document.createElement('div');
          const image = document.createElement('img');
          image.src = memoObj.imageUrl;
          image.alt = 'Memo Image';
          image.classList.add('memo-image');
          imageContainer.appendChild(image);

          const editImageButton = document.createElement('button');
          editImageButton.textContent = '사진 수정';
          editImageButton.onclick = function() {
            editImage(i);
          };
          imageContainer.appendChild(editImageButton);

          const deleteImageButton = document.createElement('button');
          deleteImageButton.textContent = '사진 삭제';
          deleteImageButton.onclick = function() {
            deleteImage(i);
          };
          imageContainer.appendChild(deleteImageButton);

          listItem.appendChild(imageContainer);
        }

        const editButton = document.createElement('button');
        editButton.textContent = '수정';
        editButton.onclick = function() {
          editMemo(i);
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '삭제';
        deleteButton.onclick = function() {
          deleteMemo(i);
        };

        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        memoList.appendChild(listItem);
      }
    }

    // 페이지 로드 시 저장된 메모 불러오기
    loadMemos();