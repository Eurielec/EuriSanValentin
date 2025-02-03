import { supabase } from "../../utils";

const validateRequest = (body) => {
    const { name, account } = body;
  
    const nameValidation = !(name === undefined && account === undefined)
    console.log("Neither name nor account validation:")
    console.log(nameValidation)
  
    return nameValidation;
  }
  

export default async function handler(req, res) {
    if (req.method === 'POST') {

        if(validateRequest(req.body)) {
          console.log(req.body);
          const { name, account } = req.body;

          if (name !== "" && account !== "") {
            var { data, error } = await supabase
            .from('piruletas')
            .select('name, account', { count: 'exact' })
            .or(`name.eq.${name}, account.eq.${account}`);
          }
          if (name === "" && account !== "") {
            var { data, error } = await supabase
            .from('piruletas')
            .select('name, account', { count: 'exact' })
            .eq('account', account);
          }
          if (name !== "" && account === "") {
            var { data, error } = await supabase
            .from('piruletas')
            .select('name, account', { count: 'exact' })
            .eq('name', name);
          }

          console.log(data);
          console.log(error);
    
          if (!error) {
            if (data.length > 0) {
              res.status(200).json({ has_piruletas: true });
            } else {
              res.status(200).json({ has_piruletas: false });
            }
          } else {
            res.status(500).end();
          }
        } else {
          // If body not valid: bad request
          res.status(400).end();
        }
    
    } else {
    // Handle any other HTTP method: not allowed
    res.status(405).end();
    }
}