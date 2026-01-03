import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-gallery-modal',
	templateUrl: './gallery-modal.component.html',
	styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent {
	@Input() folder!: string;

	images = Array.from({ length: 5 }, (v, k) => `${this.folder}/${k + 1}.png`);

	ngOnInit(): void {
		const gallery = document.getElementById('gallery')!;
		const prev = document.getElementById('gallery-prev')!;
		const next = document.getElementById('gallery-next')!;
		const close = document.getElementById('gallery-close')!;

		prev.addEventListener('click', () => this.step(-1));
		next.addEventListener('click', () => this.step(1));
		close.addEventListener('click', () => this.close());

		this.addImages();
	}

	addImages(): void {
		const galleryImages = document.getElementById('gallery-images')!;
		const images = Array.from({ length: 5 }, (v, k) => `${this.folder}/${k + 1}.png`);

		images.forEach((image) => {
			const img = document.createElement('img');
			img.src = image;
			galleryImages.appendChild(img);
		});

		const gallery = document.getElementById('gallery')!;
		gallery.style.display = 'flex';
	}

	close(): void {
		const gallery = document.getElementById('gallery')!;
		gallery.style.display = 'none';
	}

	step(step: number): void {
		const galleryImages = document.getElementById('gallery-images')!;
		const images = galleryImages.getElementsByTagName('img');
		const current = Array.from(images).findIndex((img) => img.style.display === 'block');
		const next = (current + step + images.length) % images.length;

		images[current].style.display = 'none';
		images[next].style.display = 'block';
	}
}
