const servicesFromDb = await Service.aggregate([
    {
        "$unwind": "$inDetail"
    },
    {
        "$lookup": {
            "from": "servicecategories",
            "localField": "inDetail.category",
            "foreignField": "_id",
            "as": "categoryData"
        }
    },
    {
        "$unwind": "$categoryData"
    },
    {
        "$addFields": {
            "inDetail.category": "$categoryData"
        }
    },
    {
        "$group": {
            "_id": {
                "serviceId": "$_id",
                "categoryId": "$inDetail.category._id"
            },
            "user": { "$first": "$user" },
            "date": { "$first": "$date" },
            "odometerReading": { "$first": "$odometerReading" },
            "totalCost": { "$first": "$totalCost" },
            "note": { "$first": "$note" },
            "__v": { "$first": "$__v" },
            "category": { "$first": "$inDetail.category" },
            "items": {
                "$push": {
                    "item": "$inDetail.item",
                    "price": "$inDetail.price"
                }
            },
            "sumPrice": { "$sum": "$inDetail.price" }
        }
    },
    {
        "$group": {
            "_id": "$_id.serviceId",
            "user": { "$first": "$user" },
            "date": { "$first": "$date" },
            "odometerReading": { "$first": "$odometerReading" },
            "totalCost": { "$first": "$totalCost" },
            "note": { "$first": "$note" },
            "__v": { "$first": "$__v" },
            "inDetail": {
                "$push": {
                    "category": "$category",
                    "items": "$items",
                    "sumPrice": "$sumPrice"
                }
            }
        }
    }
   
  ])



  output will be 


  {
    "serviceLog": [
        {
            "_id": "664d90f857e9182c17024e8f",
            "user": "664b4a39f4abe6ed1eb94a87",
            "date": "2024-01-01T00:00:00.000Z",
            "odometerReading": 600,
            "totalCost": 1700,
            "note": "Service Test Data",
            "__v": 0,
            "inDetail": [
                {
                    "category": {
                        "_id": "664d87fe7977a2c4785bcbd8",
                        "name": "labour",
                        "__v": 0
                    },
                    "items": [
                        {
                            "item": "Side Mirror - labour charge",
                            "price": 700
                        }
                    ],
                    "sumPrice": 700
                },
                {
                    "category": {
                        "_id": "664d87c67977a2c4785bcbd6",
                        "name": "part cost",
                        "__v": 0
                    },
                    "items": [
                        {
                            "item": "Side Mirror",
                            "price": 1000
                        }
                    ],
                    "sumPrice": 1000
                }
            ]
        },
        {
            "_id": "664d917f57e9182c17024e94",
            "user": "664b4a39f4abe6ed1eb94a87",
            "date": "2024-03-01T00:00:00.000Z",
            "odometerReading": 1600,
            "totalCost": 3700,
            "note": "Service Test Data",
            "__v": 0,
            "inDetail": [
                {
                    "category": {
                        "_id": "664d87c67977a2c4785bcbd6",
                        "name": "part cost",
                        "__v": 0
                    },
                    "items": [
                        {
                            "item": "Break Pad",
                            "price": 2000
                        },
                        {
                            "item": "Engine Oil",
                            "price": 1000
                        }
                    ],
                    "sumPrice": 3000
                },
                {
                    "category": {
                        "_id": "664d87fe7977a2c4785bcbd8",
                        "name": "labour",
                        "__v": 0
                    },
                    "items": [
                        {
                            "item": "Oil Change",
                            "price": 700
                        }
                    ],
                    "sumPrice": 700
                }
            ]
        }
    ]
}