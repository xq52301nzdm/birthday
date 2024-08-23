class Modal {
	static #ModalInstance = null

	constructor() {
		if (Modal.#ModalInstance) {
			throw new Error(`Modal is a single Instance`)
		}
		/**
         * 单例，即只有单个的实例，使用私有属性实现最适合
		 * 如果没被实例化过，则无需处理，在调用方法的过程中再去实例化，
		 * 不管有没有执行先进行了实例化，称为 <饿汉式单例>
		 * */
	}

	static getInstance() {
		if (!Modal.#ModalInstance) {
			Modal.#ModalInstance = new Modal()
		}
		return Modal.#ModalInstance
	}

	static open(v) {
		Modal.getInstance().open(v)
	}

	open(v) {
		alert(v)
	}
}
