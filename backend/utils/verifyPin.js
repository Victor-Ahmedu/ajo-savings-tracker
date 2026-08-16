const bcrypt = require('bcryptjs');
const supabase = require('../config/supabase');

async function verifyGroupPin(groupId, pin) {
  const { data, error } = await supabase
    .from('groups')
    .select('pin_hash')
    .eq('id', groupId)
    .single();

  if (error || !data || !data.pin_hash) {
    return false;
  }

  return bcrypt.compare(pin, data.pin_hash);
}

module.exports = verifyGroupPin;