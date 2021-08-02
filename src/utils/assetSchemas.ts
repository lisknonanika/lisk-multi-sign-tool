export const assetSchemas = [
  {
    "moduleAssetId": "2:0",
    "moduleAssetName": "token:transfer",
    "schema": {
      "$id": "lisk/transfer-asset",
      "title": "Transfer transaction asset",
      "type": "object",
      "required": [
        "amount",
        "recipientAddress",
        "data"
      ],
      "properties": {
        "amount": {
          "dataType": "uint64",
          "fieldNumber": 1
        },
        "recipientAddress": {
          "dataType": "bytes",
          "fieldNumber": 2,
          "minLength": 20,
          "maxLength": 20
        },
        "data": {
          "dataType": "string",
          "fieldNumber": 3,
          "minLength": 0,
          "maxLength": 64
        }
      }
    }
  },
  {
    "moduleAssetId": "5:0",
    "moduleAssetName": "dpos:registerDelegate",
    "schema": {
      "$id": "lisk/dpos/register",
      "type": "object",
      "required": [
        "username"
      ],
      "properties": {
        "username": {
          "dataType": "string",
          "fieldNumber": 1,
          "minLength": 1,
          "maxLength": 20
        }
      }
    }
  },
  {
    "moduleAssetId": "5:1",
    "moduleAssetName": "dpos:voteDelegate",
    "schema": {
      "$id": "lisk/dpos/vote",
      "type": "object",
      "required": [
        "votes"
      ],
      "properties": {
        "votes": {
          "type": "array",
          "minItems": 1,
          "maxItems": 20,
          "items": {
            "type": "object",
            "required": [
              "delegateAddress",
              "amount"
            ],
            "properties": {
              "delegateAddress": {
                "dataType": "bytes",
                "fieldNumber": 1,
                "minLength": 20,
                "maxLength": 20
              },
              "amount": {
                "dataType": "sint64",
                "fieldNumber": 2
              }
            }
          },
          "fieldNumber": 1
        }
      }
    }
  },
  {
    "moduleAssetId": "5:2",
    "moduleAssetName": "dpos:unlockToken",
    "schema": {
      "$id": "lisk/dpos/unlock",
      "type": "object",
      "required": [
        "unlockObjects"
      ],
      "properties": {
        "unlockObjects": {
          "type": "array",
          "minItems": 1,
          "maxItems": 20,
          "items": {
            "type": "object",
            "required": [
              "delegateAddress",
              "amount",
              "unvoteHeight"
            ],
            "properties": {
              "delegateAddress": {
                "dataType": "bytes",
                "fieldNumber": 1,
                "minLength": 20,
                "maxLength": 20
              },
              "amount": {
                "dataType": "uint64",
                "fieldNumber": 2
              },
              "unvoteHeight": {
                "dataType": "uint32",
                "fieldNumber": 3
              }
            }
          },
          "fieldNumber": 1
        }
      }
    }
  }
]