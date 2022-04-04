export const mockRule = {
    "name" : "hrhv-trigger",
    "schemaId" : "hrhv-conditions",
    "isActive" : false,
    "conditions" : {
        "all" : [ 
            {
                "immutable" : true,
                "fact" : "Order.Requirement.Name",
                "operator" : "==",
                "value" : "HRHV"
            }, 
            {
                "immutable" : true,
                "fact" : "Order.Requirement.Active",
                "operator" : "==",
                "value" : true
            }, 
            {
                "all" : [ 
                    {
                        "fact" : "Order.TransportMode",
                        "operator" : "==",
                        "value" : "Van"
                    }, 
                    {
                        "fact" : "Order.ServiceLevel",
                        "operator" : "==",
                        "value" : "Gold"
                    },
                    {
                        "all": [
                            {
                                "fact" : "Order.TransportMode",
                                "operator" : "==",
                                "value" : "Van"
                            }, 
                            {
                                "fact" : "Order.ServiceLevel",
                                "operator" : "==",
                                "value" : "Gold"
                            }
                        ]
                    }
                ]
            },
            {
                "any" : [ 
                    {
                        "fact" : "Order.CustomerStatus",
                        "operator" : "==",
                        "value" : "Active"
                    }, 
                    {
                        "fact" : "Order.Status",
                        "operator" : "==",
                        "value" : "Pending"
                    },
                    {
                        "fact": "Order.Items",
                        "operator": ">",
                        "value": 3
                    }
                ]
            }
        ],
        "any" : [ 
            {
                "fact" : "Order.Outter",
                "operator" : "==",
                "value" : "Active"
            }, 
            {
                "fact" : "Order.Outtter",
                "operator" : "==",
                "value" : "Pending"
            }
        ]
    }
}