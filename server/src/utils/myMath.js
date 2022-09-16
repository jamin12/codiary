class myMath {
	/**
	 * 조합 구하기
	 * @param {Array} arr
	 * @param {number} selectNumber
	 * @returns {Object}
	 */
	getCombinations(arr, selectNumber) {
		const results = [];
		if (selectNumber === 1) return arr.map((el) => [el]);
		// n개중에서 1개 선택할 때(nC1), 바로 모든 배열의 원소 return

		arr.forEach((fixed, index, origin) => {
			const rest = origin.slice(index + 1);
			// 해당하는 fixed를 제외한 나머지 뒤
			const combinations = this.getCombinations(rest, selectNumber - 1);
			// 나머지에 대해서 조합을 구한다.
			const attached = combinations.map((el) => [fixed, ...el]);
			//  돌아온 조합에 떼 놓은(fixed) 값 붙이기
			results.push(...attached);
			// 배열 spread syntax 로 모두다 push
		});
		return results; // 결과 담긴 results return
	}

	/**
	 * 랜덤 수 구하기
	 * @param {number} min
	 * @param {number} max
	 * @returns {Object}
	 */
	getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
	}
}

module.exports = myMath;
