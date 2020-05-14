'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('games', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    level: {
      type: 'smallint',
      length: 5
    },
    score: {
      type: 'int'
    },
    solved: {
      type: 'text'
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('now()')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      defaultValue: new String('now()')
    },
    ip_address: {
      type: 'char'
    },
  }, function(err){
    if (err) return callback(err);
    return callback();
  });
};

exports.down = function(db, callback) {
  db.dropTable('games', callback)
};

exports._meta = {
  "version": 1
};
