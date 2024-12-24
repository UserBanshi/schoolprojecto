document.addEventListener('DOMContentLoaded', () => {
    // Элементы модального окна
    const modal = document.querySelector('#photo-modal');
    const modalImg = document.querySelector('#modal-image');
    const modalCaption = document.querySelector('#modal-caption');
    const closeModal = document.querySelector('.close-modal');

    // Список всех миниатюр
    const thumbnails = Array.from(document.querySelectorAll('.thumbnail'));
    let currentImgIndex = -1;

    // Открытие модального окна
    function openModal(index) {
        if (index >= 0 && index < thumbnails.length) {
            currentImgIndex = index;
            const img = thumbnails[currentImgIndex];
            modalImg.src = img.src; // Устанавливаем изображение в модальное окно
            modalCaption.textContent = img.alt || 'Изображение'; // Устанавливаем подпись
            modal.style.display = 'flex'; // Показываем модальное окно
        }
    }

    // Закрытие модального окна
    function closeModalWindow() {
        modal.style.display = 'none';
        modalImg.src = ''; // Убираем изображение из модального окна
        modalCaption.textContent = ''; // Очищаем подпись
    }

    // Навигация между изображениями
    function navigate(direction) {
        currentImgIndex += direction;
        if (currentImgIndex < 0) {
            currentImgIndex = thumbnails.length - 1; // Зацикливаем на последний элемент
        } else if (currentImgIndex >= thumbnails.length) {
            currentImgIndex = 0; // Зацикливаем на первый элемент
        }
        openModal(currentImgIndex);
    }

    // Обработчики событий
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => openModal(index));
    });

    closeModal.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalWindow();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (modal.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                navigate(-1); // Перемещение влево
            } else if (event.key === 'ArrowRight') {
                navigate(1); // Перемещение вправо
            } else if (event.key === 'Escape') {
                closeModalWindow(); // Закрытие окна
            }
        }
    });
});
