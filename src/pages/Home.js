import React from 'react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import Checkout from '../components/Checkout';

function Home() {
	return (
		<div>
			<MuiPickersUtilsProvider utils={MomentUtils}>
				<Checkout />
			</MuiPickersUtilsProvider>
		</div>
	);
}

export default Home;
