//
// Deploy - Continuous Delivery, Faster
// Copyright (C) 2016 by David Edmonds
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
import { logger } from '../util/logger';

const tables = ['pipelines'];

export default async function DbInit(r) {
  logger.info('Checking db status an upgrading if required');
  let conn = await r.connect({ host: '172.17.0.1', port: 28015 });
  let dbs = await r.dbList().run(conn);
  if (!dbs.includes('deploy')) {
    logger.debug('Database does not exist, creating...');
    await r.dbCreate('deploy').run(conn);
  }
  let tableList = await r.db('deploy').tableList().run(conn);
  await tables.forEach((table) => {
    if (!tableList.includes(table)) {
      logger.debug('Creating missing table', table);
      r.db('deploy').tableCreate(table).run(conn);
    }
  });
  logger.info('DB status check complete');
}
